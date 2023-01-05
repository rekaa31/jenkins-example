const db = require("../../../models");
const JadwalPegawai = db.jadwalPegawai;
const Users = db.users;
const JadwalKerja = db.jadwalKerja;

exports.fetchAll = async (req, res) => {
  try {
    const options = {
      page: req.query.page,
      limit: req.query.limit
    };

    let data = []

    if (options.page && options.limit) {
      data = await JadwalPegawai.paginate({}, options)
    } else {
      data = await JadwalPegawai.find({})
    }

    res.status(200).send({
      message: "Fetch Jadwal Pegawai Success!",
      payload: data
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jadwal Pegawai."
    });
  }
}

exports.fetchOneById = async (req, res) => {
  try {
    const data = await JadwalPegawai.findById(req.params.id);

    res.status(200).send({
      message: "Fetch Jadwal Pegawai Success!",
      payload: data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        error.message || "Some error occurred while fetching the Jadwal Pegawai."
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

    const user = await Users.findById(req.body.user_id);

    if (!user) {
      res.status(202).send({ message: "User not found, create document failed" });
      return;
    }

    const jadwalKerja = await JadwalKerja.findById(req.body.jadwal_kerja_id);

    if (!jadwalKerja) {
      res.status(202).send({ message: "Jadwal Kerja not found, create document failed" });
      return;
    }

    const jadwalPegawai = new JadwalPegawai(req.body);

    // Save shift in the database
    jadwalPegawai
      .save(jadwalPegawai)
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
