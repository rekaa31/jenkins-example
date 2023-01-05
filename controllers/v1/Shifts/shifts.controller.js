const mongoose = require('mongoose');
const db = require("../../../models");
const Shifts = db.shifts;

exports.fetchAll = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit
    };

    let data = []

    if (options.page && options.limit) {
      data = await Shifts.paginate({}, options)
    } else {
      data = await Shifts.find({})
    }

    res.status(200).send({
      message: "Fetch Shifts Success!",
      payload: data
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Shifts."
    });
  }
}

exports.fetchOneById = async (req, res) => {
  try {
    const data = await Shifts.findById(req.params.id);

    res.status(200).send({
      message: "Fetch Shift Success!",
      payload: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Shifts."
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

    const shift = new Shifts({
      ...req.body,
      shift: req.body.shift.toUpperCase(),
    });

    // Save shift in the database
    shift
      .save(shift)
      .then(data => {
        res.send({
          message: "Create Shift Success!"
        })
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send({
          message: "Create Shift Failed!",
          error: err.message
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Shifts."
    });
  }
}

exports.update = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const shift = {
      ...req.body,
      shift: req.body.shift.toUpperCase(),
    }

    const updatedShift = await Shifts.findByIdAndUpdate(req.params.id, shift, {
      new: true,
    });

    res.status(200).send({
      message: "Update Shift Success!",
      payload: updatedShift,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Shifts."
    });
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = {
      _id: mongoose.Types.ObjectId(req.params.id)
    }

    const deletedShift = await Shifts.deleteOne(id);

    res.status(200).send({
      message: "Delete Shift Success!",
      payload: deletedShift,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Shifts."
    });
  }
}
