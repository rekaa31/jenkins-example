const db = require("../../../models");
const Attendances = db.attendances;
const Users = db.users;
const moment = require('moment')
const fs = require("fs");
const { minioClient } = require("../../../config/minio.config");
const { v4: uuidv4 } = require('uuid');

const bucketName = "presensi-image";

exports.fetchAll = async (req, res) => {

	try {

		const options = {
			page: req.query.page,
			limit: req.query.limit
		};

		const data = await Attendances.paginate({}, options);

		res.status(200).send({
			message: "Fetch Attendances Success!",
			payload: data
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

		const data = await Attendances.findById(req.params.id)

		res.status(200).send({
			message: "Fetch Attendance Success!",
			payload: data
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.checkIn = async (req, res) => {
	try {
		// Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

		const profile = await Users.findById(req.body.user_id).select("-password -__v -token -otp")
		const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		// Getting the file type, ie: jpeg, png or gif
		const type = req.body.image.split(';')[0].split('/')[1];

		// console.log(profile.name.toLowerCase().replace(" ","-"))
		const objectFileName = `${profile.name.toLowerCase().replace(" ", "-")}/presensi-checkin-${moment().format("DDMMYYYY")}.${type}`;

		await minioClient.putObject(bucketName, objectFileName, base64Data).catch((e) => {
			console.log("Error while creating object from file data: ", e);
			throw e;
		});

		let Attendance = await Attendances.find({
			user_id: req.body.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-IN"
		})

		if (Attendance.length !== 0) {
			res.status(400).send({ message: "Anda sudah melakukan Check-In" });
			return;
		}

		// Create a Permissions
		const attendance = new Attendances({
			user_id: req.body.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-IN",
			presensi_detail: {
				check_time: new Date(),
				status: true,
				location: req.body.location,
				keterangan: "",
				image: objectFileName
			}
		});

		// Save Permissions in the database
		attendance
			.save(attendance)
			.then(data => {
				res.send({
					message: "Check In Success!"
				})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({
					message: err.message
				});
			});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.checkOut = async (req, res) => {
	try {
		// Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

		const profile = await Users.findById(req.body.user_id).select("-password -__v -token -otp")
		const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		// Getting the file type, ie: jpeg, png or gif
		const type = req.body.image.split(';')[0].split('/')[1];

		// console.log(profile.name.toLowerCase().replace(" ","-"))
		const objectFileName = `${profile.name.toLowerCase().replace(" ", "-")}/presensi-checkout-${moment().format("DDMMYYYY")}.${type}`;

		await minioClient.putObject(bucketName, objectFileName, base64Data).catch((e) => {
			console.log("Error while creating object from file data: ", e);
			throw e;
		});

		let Attendance = await Attendances.find({
			user_id: req.body.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-OUT"
		})

		if (Attendance.length !== 0) {
			res.status(400).send({ message: "Anda sudah melakukan Check-Out" });
			return;
		}

		// Create a Permissions
		const attendance = new Attendances({
			user_id: req.body.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-OUT",
			presensi_detail: {
				check_time: new Date(),
				status: true,
				location: req.body.location,
				keterangan: "",
				image: objectFileName
			}

		});

		// Save Permissions in the database
		attendance
			.save(attendance)
			.then(data => {
				res.send({
					message: "Check Out Success!"
				})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send({
					message: err.message
				});
			});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}
