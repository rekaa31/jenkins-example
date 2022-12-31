const db = require("../../../models");
const Attendances = db.attendances;

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

exports.create = async (req, res) => {
	try {
		// Validate request
		if (!req.body) {
			res.status(400).send({ message: "Content can not be empty!" });
			return;
		}

		// Create a Permissions
		const attendance = new Attendances({
			user_id: req.body.user_id,
      location: req.body.location,
      status_presensi_awal: req.body.status_presensi_awal,
      status_presensi_awal: req.body.status_presensi_awal
		});

		// Save Permissions in the database
		attendance
			.save(attendance)
			.then(data => {
				res.send({
					message: "Create Attendance Success!"
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
