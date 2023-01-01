const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../../../models");
const Users = db.users;
const config = require("../../../config/auth.config.js");

exports.login = async (req, res) => {
  try {
    // Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

    const user = await Users.find({
      nik: req.body.nik
    });

    if(user.length === 0) {
      res.status(403).send({ message: "NIK or password is not correct" });
			return;
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user[0].password);

    if(!isPasswordCorrect) {
      res.status(403).send({ message: "NIK or password is not correct" });
			return;
    }

    if(!user[0].is_verified) {
      res.status(403).send({ message: "User is not verified" });
			return;
    }

    const token = jwt.sign(
      {
        user_id: user[0]._id,
      },
      config.secret,
      { expiresIn: 3600 } // expires in an hour
    )

    res.status(200).send({
			message: "Login Success!",
			token
		});
  } catch(error) {
    console.log(error)
    res.status(500).send({
      message:
      error.message || "Some error occurred while creating the Permissions."
    });
  }
}