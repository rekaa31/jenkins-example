const db = require("../../../models");
const bcrypt = require('bcrypt');
const { countRangeDuration } = require("../../../utils/countRangeDuration");
const Users = db.users;
const Divisions = db.divisions;
const Roles = db.roles;

exports.fetchAll = async (req, res) => {

	try {

		const data = await Users.find({}).select("-password -__v -token -otp")
		const division = JSON.parse(JSON.stringify(await Divisions.find({})))
		const role = JSON.parse(JSON.stringify(await Roles.find({})))

		const newArray = []

		data.forEach((user) => {
			let dataUser = JSON.parse(JSON.stringify(user))
			dataUser.lama_kerja = countRangeDuration(user.tanggal_masuk)
			dataUser.divisi = division.find((item) => item._id === user.divisi).name.toUpperCase()
			dataUser.role = role.find((item) => item._id === user.role).name.toUpperCase()
			newArray.push(dataUser)
		})

		res.status(200).send({
			message: "Fetch Users Success!",
			payload: newArray
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.fetchOne = async (req, res) => {

	try {

		const data = await Users.findById(req.params.id).select("-password -__v -token -otp")
		const division = JSON.parse(JSON.stringify(await Divisions.find({})))
		const role = JSON.parse(JSON.stringify(await Roles.find({})))

		let dataUser = JSON.parse(JSON.stringify(data))

		dataUser.lama_kerja = countRangeDuration(new Date(dataUser.tanggal_masuk))
		dataUser.divisi = division.find((item) => item._id === dataUser.divisi).name.toUpperCase()
		dataUser.role = role.find((item) => item._id === dataUser.role).name.toUpperCase()

		res.status(200).send({
			message: "Fetch Users Success!",
			payload: dataUser
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.create = async (req, res) => {

	const saltRounds = 10;

	try {
		// Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

		let passwordBcrypt = await bcrypt.hash(req.body.password, saltRounds);

		// Create a Permissions
		const users = new Users({
			name: req.body.name.toUpperCase(),
			nip: req.body.nip,
			nik: req.body.nik,
			role: req.body.role,
			tempat_lahir: req.body.tempat_lahir.toUpperCase(),
			tanggal_lahir: req.body.tanggal_lahir,
			tanggal_masuk: req.body.tanggal_masuk,
			agama: req.body.agama,
			status_perkawinan: req.body.status_perkawinan,
			alamat: req.body.alamat,
			otp: null,
			ip_address: null,
			is_verified: false,
			token: "",
			divisi: req.body.divisi,
			email: req.body.email,
			nomor_kontak: req.body.nomor_kontak,
			password: passwordBcrypt,
			last_login: null
		});

		// Save Permissions in the database
		users
			.save(users)
			.then(data => {
				res.send({
					message: "Create User Success!"
				})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({
					message: "User sudah terdaftar!"
				});
			});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.verification = async (req, res) => {
	try {
		const data = await Users.findById(req.params.id).select("-password -__v -token -otp")
		const update = {
			is_verified : !data.is_verified
		}

		data.updateOne(update).then(() => {
			if(update.is_verified){
				res.send({
					message: "User has been Verified!"
				})
			}else{
				res.send({
					message: "User has been Unverified!"
				})
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).send({
				message: "User sudah terdaftar!"
			});
		});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}