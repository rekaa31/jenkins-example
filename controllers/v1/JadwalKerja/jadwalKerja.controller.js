const mongoose = require('mongoose');
const db = require("../../../models");
const JadwalKerja = db.jadwalKerja;

exports.fetchAll = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit
    };

    let data = []

    if (options.page && options.limit) {
      data = await JadwalKerja.paginate({}, options)
    } else {
      data = await JadwalKerja.find({})
    }

    res.status(200).send({
      message: "Fetch Jadwal Kerja Success!",
      payload: data
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jadwal Kerja."
    });
  }
}

exports.fetchOneById = async (req, res) => {
  try {
    const data = await JadwalKerja.findById(req.params.id);

    res.status(200).send({
      message: "Fetch Jadwal Kerja Success!",
      payload: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jadwal Kerja."
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

    const currentJadwalKerja = await JadwalKerja.findOne({
      nama: `${req.body.bulan} ${req.body.tahun}`,
    });

    if (currentJadwalKerja) {
      res.status(500).send({
        message: `Jadwal Kerja ${req.body.bulan} ${req.body.tahun} is already exists.`,
      });
      return;
    }

    const jadwalKerja = new JadwalKerja({
      ...req.body,
      nama: `${req.body.bulan} ${req.body.tahun}`,
    });

    // Save shift in the database
    jadwalKerja
      .save(jadwalKerja)
      .then(data => {
        res.send({
          message: "Create Jadwal Kerja Success!"
        })
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).send({
          message: "Create Jadwal Kerja Failed!",
          error: err.message
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Jadwal Kerja."
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

    const currentJadwalKerja = await JadwalKerja.findOne({
      nama: `${req.body.bulan} ${req.body.tahun}`,
    });

    if (currentJadwalKerja.id !== req.params.id) {
      res.status(500).send({
        message: `Jadwal Kerja ${req.body.bulan} ${req.body.tahun} is already exists.`,
      });
      return;
    }

    const jadwalKerja = {
      ...req.body,
      nama: `${req.body.bulan} ${req.body.tahun}`,
    }

    const updatedJadwalKerja = await JadwalKerja.findByIdAndUpdate(req.params.id, jadwalKerja, {
      new: true,
    });

    res.status(200).send({
      message: "Update Jadwal Kerja Success!",
      payload: updatedJadwalKerja,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the Jadwal Kerja."
    });
  }
}

exports.deleteOne = async (req, res) => {
  try {
    const id = {
      _id: mongoose.Types.ObjectId(req.params.id)
    }

    const deletedJadwalKerja = await JadwalKerja.deleteOne(id);

    res.status(200).send({
      message: "Delete Jadwal Kerja Success!",
      payload: deletedJadwalKerja,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Jadwal Kerja."
    });
  }
}
