const db = require("../../../models");
const bcrypt = require('bcrypt');
const { countRangeDuration } = require("../../../utils/countRangeDuration");
const Users = db.users;
const Divisions = db.divisions;
const Roles = db.roles;
const moment = require('moment')

exports.fetchAll = async (req, res) => {

	try {

		const options = {
			page: req.query.page,
			limit: req.query.limit,
			select: "-password -__v -token -otp"
		};

		let query = {
			role: {
				$ne: "super.admin"
			}
		}

		const data = await Users.paginate(query, options)
		const division = JSON.parse(JSON.stringify(await Divisions.find({})))
		const role = JSON.parse(JSON.stringify(await Roles.find({})))

		const newArray = []

		data.docs.forEach((user) => {
			let dataUser = JSON.parse(JSON.stringify(user))
			dataUser.lama_kerja = countRangeDuration(user.tanggal_masuk)
			dataUser.divisi = division.find((item) => item._id === user.divisi).name.toUpperCase()
			dataUser.role = role.find((item) => item.code === user.role).name.toUpperCase()
			newArray.push(dataUser)
		})

		res.status(200).send({
			message: "Fetch Users Success!",
			payload: {
				...data,
				docs: newArray
			}
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
		dataUser.role = role.find((item) => item.code === dataUser.role).name.toUpperCase()

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
			tanggal_lahir: new Date(req.body.tanggal_lahir),
			tanggal_masuk: new Date(req.body.tanggal_masuk),
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
				console.log(err.message)
				res.status(500).send({
					message: "Create User Failed!",
					error: err.message
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
			is_verified: !data.is_verified
		}

		data.updateOne(update).then(() => {
			if (update.is_verified) {
				res.send({
					message: "User has been Verified!"
				})
			} else {
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

exports.importData = async (req, res) => {
	try {
		res.status(200).send({
			message: "Masuk"
		});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.update = async (req, res) => {
	const saltRounds = 10;
	try {
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

		const passwordBcrypt = await bcrypt.hash(req.body.password, saltRounds);
		const { nip, nik, email, nomor_kontak } = req.body;

		if (nip || nik || email || nomor_kontak) {
			res.status(500).send({ message: "NIP, NIK, email, or contact number can not be changed" });
			return;
		}

		const user = {
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

		const updatedUser = await Users.findByIdAndUpdate(req.params.id, user, {
			new: true,
		});

		res.status(200).send({
			message: "Update User Success!",
			payload: updatedUser
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}