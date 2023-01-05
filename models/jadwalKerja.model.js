const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const HariLiburNasionalSchema = mongoose.Schema({
  tanggal: Date,
  is_merah: Boolean,
  keterangan: String,
})

const HariLiburWeekendSchema = mongoose.Schema({
  tanggal: Date,
})

const HariLiburSchema = mongoose.Schema({
  nasional: [HariLiburNasionalSchema],
  weekend: [HariLiburWeekendSchema],
})

const KuotaDetailSchema = mongoose.Schema({
  posisi: String,
  total: Number,
})

const KuotaSchema = mongoose.Schema({
  weekday: [KuotaDetailSchema],
  weekend_libur: [KuotaDetailSchema],
})

module.exports = mongoose => {
  const JadwalKerja = mongoose.model(
    "JadwalKerja",
    mongoose.Schema(
      {
        nama: String,
        tahun: Number,
        hari_libur: HariLiburSchema,
        kuota: KuotaSchema,
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return JadwalKerja;
};
