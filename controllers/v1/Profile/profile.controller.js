const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const db = require("../../../models");
const Users = db.users;
const config = require("../../../config/auth.config.js");
const Roles = db.roles;
const Divisions = db.divisions;

exports.fetchProfile = async (req, res) => {
	try {
    const token = req.headers["authorization"].split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwtSecret);

    const profile = await Users.findById(decodedToken.user_id).select("-password -__v -token -otp")
		const role = JSON.parse(JSON.stringify(await Roles.find({})))
		const divisions = JSON.parse(JSON.stringify(await Divisions.find({})))

    const dataProfile = JSON.parse(JSON.stringify(profile))
    dataProfile.role = role.find((item) => item.code === dataProfile.role).name.toUpperCase()
    dataProfile.divisi = divisions.find((item) => item._id === dataProfile.divisi).name.toUpperCase()

    res.status(200).send({
      message: "Fetch Profile Success!",
      payload: dataProfile
    });

	} catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Permissions."
    });
	}
}

exports.updateProfile = async (req, res) => {
  const saltRounds = 10;
	try {
    if(!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
    }
    
    const passwordBcrypt = await bcrypt.hash(req.body.password, saltRounds);
    const { nip, nik, email, nomor_kontak } = req.body;

    if(nip || nik || email || nomor_kontak) {
      res.status(500).send({ message: "NIP, NIK, email, or contact number can not be changed" });
			return;
    }

    const profile = {
			name: req.body.name.toUpperCase(),
			role: req.body.role,
			tempat_lahir: req.body.tempat_lahir.toUpperCase(),
			tanggal_lahir: req.body.tanggal_lahir,
			tanggal_masuk: req.body.tanggal_masuk,
			agama: req.body.agama,
			status_perkawinan: req.body.status_perkawinan,
			alamat: req.body.alamat,
			otp: req.body.otp,
			ip_address: req.body.ip_address,
			is_verified: req.body.is_verified,
			token: "",
			divisi: req.body.divisi,
			email: req.body.email,
			nomor_kontak: req.body.nomor_kontak,
			password: passwordBcrypt,
			last_login: null
		};

    const updatedProfile = await Users.findByIdAndUpdate(req.params.id, profile, {
      new: true,
    });

    res.status(200).send({
      message: "Update Profile Success!",
      payload: updatedProfile
    });

	} catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Permissions."
    });
	}
}
