const mongoose = require('mongoose');
const db = require("../../../models");
const Jabatan = db.jabatan;

exports.fetchAll = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit
    };

    let data = []

    if (options.page && options.limit) {
      data = await Jabatan.paginate({}, options)
    } else {
      data = await Jabatan.find({})
    }

    res.status(200).send({
      message: "Fetch Jabatan Success!",
      payload: data
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jabatan."
    });
  }
}

exports.fetchOneById = async (req, res) => {
  try {
    const data = await Jabatan.findById(req.params.id);

    res.status(200).send({
      message: "Fetch Jabatan Success!",
      payload: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jabatan."
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

    const jabatan = new Jabatan(req.body);

    // Save shift in the database
    jabatan
      .save(jabatan)
      .then(data => {
        res.send({
          message: "Create Jabatan Success!"
        })
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send({
          message: "Create Jabatan Failed!",
          error: err.message
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Jabatan."
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

    const updatedJabatan = await Jabatan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send({
      message: "Update Jabatan Success!",
      payload: updatedJabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the Jabatan."
    });
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = {
      _id: mongoose.Types.ObjectId(req.params.id)
    }

    const deletedJabatan = await Jabatan.deleteOne(id);

    res.status(200).send({
      message: "Delete Jabatan Success!",
      payload: deletedJabatan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while deleting the Jabatan."
    });
  }
}