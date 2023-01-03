const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("../../../config/auth.config.js");
const db = require("../../../models");
const { default: mongoose } = require('mongoose');
const Users = db.users;

exports.login = async (req, res) => {
  try {
    // Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

    const user = await Users.find({
      nip: req.body.nip
    });

    if(user.length === 0) {
      res.status(403).send({ message: "NIP or password is not correct" });
			return;
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user[0].password);

    if(!isPasswordCorrect) {
      res.status(403).send({ message: "NIP or password is not correct" });
			return;
    }

    if(!user[0].is_verified) {
      res.status(403).send({ message: "User is not verified" });
			return;
    }

    const token = jwt.sign(
      { user_id: user[0]._id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    )

    // Create refresh token
    const refreshToken = jwt.sign(
      { user_id: user[0]._id },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiration }
    )

    const updatedUser = await Users.findByIdAndUpdate(user[0]._id, {
      token: refreshToken,
    })

    if(updatedUser) {
      res.status(200).send({
        message: "Login Success!",
        token,
        refreshToken,
      });
    }

    res.status(500).send({
      message: "Some error occurred while creating the Permissions."
    });
  } catch(error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Permissions."
    });
  }
}

exports.refreshToken = async (req, res) => {
  try {
    // Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

    const { refreshToken } = req.body;

    if(!refreshToken) {
      res.status(401).send({ message: "Token is not defined" });
			return;
    }

    // Verify refresh token
    const refreshTokenInfo = jwt.verify(refreshToken, config.refreshTokenSecret);

    // Create new refresh token
    const newRefreshToken = jwt.sign(
      { user_id: refreshTokenInfo._id },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiration }
    )

    // Create new token
    const accessToken = jwt.sign(
      { user_id: refreshTokenInfo._id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    )

    const user = await Users.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(refreshTokenInfo.user_id),
      token: refreshToken,
    }, {
      token: newRefreshToken
    }, {
      new: true,
    })

    if(user) {
      res.status(200).send({
        message: "Refresh token created!",
        accessToken,
        refreshToken: newRefreshToken,
      });
    }

    res.status(500).send({
      message: "Some error occurred while creating the Permissions."
    });
  } catch(error) {
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Permissions."
    });
  }
}
