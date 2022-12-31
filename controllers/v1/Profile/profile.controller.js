const jwt = require("jsonwebtoken");
const db = require("../../../models");
const Users = db.users;
const config = require("../../../config/auth.config.js");

exports.fetchProfile = async (req, res) => {
	try {
    const token = req.headers["authorization"].split(' ')[1];

    if(!token) {
      res.status(403).send({ message: "No token provided" });
			return;
    }

    const decodedToken = jwt.verify(token, config.secret);

    if(!decodedToken) {
      res.status(401).send({ message: "Token unauthorized" });
			return;
    }

    const profile = await Users.findById(decodedToken.user_id).select("-password -__v -token -otp")

    res.status(200).send({
      message: "Fetch Profile Success!",
      payload: profile
    });

	} catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Permissions."
    });
	}
}