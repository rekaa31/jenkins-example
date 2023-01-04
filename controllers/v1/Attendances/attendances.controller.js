const db = require("../../../models");
const Attendances = db.attendances;
const Users = db.users;
const moment = require('moment')
const fs = require("fs");
const { minioClient } = require("../../../config/minio.config");
const { v4: uuidv4 } = require('uuid');
const config = require("../../../config/auth.config.js");
const jwt = require("jsonwebtoken");

const bucketName = "presensi-image";

exports.checkAttendence = async (req, res) => {

	try {

		const token = req.headers["authorization"].split(' ')[1];

		if (!token) {
			res.status(403).send({ message: "No token provided" });
			return;
		}

		const decodedToken = jwt.verify(token, config.jwtSecret);

		if (!decodedToken) {
			res.status(401).send({ message: "Token unauthorized" });
			return;
		}

		let AttendanceCheckIn = await Attendances.find({
			user_id: decodedToken.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-IN"
		})

		let AttendanceCheckOut = await Attendances.find({
			user_id: decodedToken.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-OUT"
		})

		res.status(200).send({
			message: "Fetch Attendances Own!",
			payload: {
				check_in: {
					status : AttendanceCheckIn.length !== 0,
					time : AttendanceCheckIn.length !== 0 ? AttendanceCheckIn[0].presensi_detail.check_time : ""
				},
				check_out: {
					status : AttendanceCheckOut.length !== 0,
					time : AttendanceCheckOut.length !== 0 ? AttendanceCheckOut[0].presensi_detail.check_time : ""
				}
			}
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

exports.fetchOwn = async (req, res) => {

	try {

		const token = req.headers["authorization"].split(' ')[1];

		if (!token) {
			res.status(403).send({ message: "No token provided" });
			return;
		}

		const decodedToken = jwt.verify(token, config.jwtSecret);

		if (!decodedToken) {
			res.status(401).send({ message: "Token unauthorized" });
			return;
		}

		let Attendance = await Attendances.aggregate([
			{
				$match: {
					"user_id": decodedToken.user_id
				}
			},
			{
				$group: {
					_id: '$tanggal',
					presensi: {
						$push: "$$ROOT"
					} // this means that the count will increment by 1
				}
			}
		]).sort({
			_id:-1
		})

		res.status(200).send({
			message: "Fetch Attendances Own!",
			payload: Attendance
		});

	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating the Permissions."
		});
	}
}

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

		const token = req.headers["authorization"].split(' ')[1];

		if (!token) {
			res.status(403).send({ message: "No token provided" });
			return;
		}

		const decodedToken = jwt.verify(token, config.jwtSecret);

		if (!decodedToken) {
			res.status(401).send({ message: "Token unauthorized" });
			return;
		}

		const profile = await Users.findById(decodedToken.user_id).select("-password -__v -token -otp")
		const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		// Getting the file type, ie: jpeg, png or gif
		const type = req.body.image.split(';')[0].split('/')[1];

		// console.log(profile.name.toLowerCase().replace(" ","-"))
		const objectFileName = `${profile.nip}-${profile.name.toLowerCase().replace(" ", "-")}/presensi-checkin-${moment().format("DDMMYYYY")}.${type}`;

		await minioClient.putObject(bucketName, objectFileName, base64Data).catch((e) => {
			console.log("Error while creating object from file data: ", e);
			throw e;
		});

		let Attendance = await Attendances.find({
			user_id: decodedToken.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-IN"
		})

		if (Attendance.length !== 0) {
			res.status(400).send({ message: "Anda sudah melakukan Check-In" });
			return;
		}

		// Create a Permissions
		const attendance = new Attendances({
			user_id: decodedToken.user_id,
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

		const token = req.headers["authorization"].split(' ')[1];

		if (!token) {
			res.status(403).send({ message: "No token provided" });
			return;
		}

		const decodedToken = jwt.verify(token, config.jwtSecret);

		if (!decodedToken) {
			res.status(401).send({ message: "Token unauthorized" });
			return;
		}

		const profile = await Users.findById(decodedToken.user_id).select("-password -__v -token -otp")
		const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		// Getting the file type, ie: jpeg, png or gif
		const type = req.body.image.split(';')[0].split('/')[1];

		// console.log(profile.name.toLowerCase().replace(" ","-"))
		const objectFileName = `${profile.nip}-${profile.name.toLowerCase().replace(" ", "-")}/presensi-checkout-${moment().format("DDMMYYYY")}.${type}`;

		await minioClient.putObject(bucketName, objectFileName, base64Data).catch((e) => {
			console.log("Error while creating object from file data: ", e);
			throw e;
		});

		let Attendance = await Attendances.find({
			user_id: decodedToken.user_id,
			tanggal: moment().format("DD/MM/YYYY"),
			type: "CHECK-OUT"
		})

		if (Attendance.length !== 0) {
			res.status(400).send({ message: "Anda sudah melakukan Check-Out" });
			return;
		}

		// Create a Permissions
		const attendance = new Attendances({
			user_id: decodedToken.user_id,
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
