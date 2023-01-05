const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const TanggalKerjaSchema = mongoose.Schema({
  tanggal: Date,
  shift_id: String,
})

module.exports = mongoose => {
  const JadwalPegawai = mongoose.model(
    "JadwalPegawai",
    mongoose.Schema(
      {
        user_id: String,
        jadwal_kerja_id: String,
        nama: String, // nama user
        tanggal_kerja: [TanggalKerjaSchema],
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return JadwalPegawai;
};
