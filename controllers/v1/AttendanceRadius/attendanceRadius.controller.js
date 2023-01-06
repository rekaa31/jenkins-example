const db = require("../../../models");
const AttendanceRadius = db.attendanceRadius;

exports.fetchAll = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit
    };

    const data = await AttendanceRadius.paginate({}, options)

    res.status(200).send({
      message: "Fetch Attendance Radius Success!",
      payload: data
    });

  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the radius."
    });
  }
}

exports.fetchOne = async (req, res) => {
  try {
    const data = await AttendanceRadius.findById(req.params.id)

    res.status(200).send({
      message: "Fetch Attendance Radius Success!",
      payload: data
    });

  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the radius."
    });
  }
}

exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // Create a Attendance Radius
    const attendanceRadius = new AttendanceRadius({
      type: req.body.type,
      work_location: req.body.work_location,
      radius: req.body.radius
    });

    // Save Attendance Radius in the database
    attendanceRadius
      .save(attendanceRadius)
      .then(data => {
        res.send({
          message: "Create Radius Success!"
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the radius."
        });
      });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the radius."
    });
  }
}

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const radius = {
      type: req.body.type,
      work_location: req.body.work_location,
      radius: req.body.radius
    };

    const updatedRadius = await AttendanceRadius.findByIdAndUpdate(req.params.id, radius, {
      new: true,
    });

    res.status(200).send({
      message: "Update Attendance Radius Success!",
      payload: updatedRadius
    });

  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Permissions."
    });
  }
}