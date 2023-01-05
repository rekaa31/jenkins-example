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

const KuotaPosisiSchema = mongoose.Schema({
  weekday: [KuotaDetailSchema],
  weekend_libur: [KuotaDetailSchema],
})

const KuotaPeroranganSchema = mongoose.Schema({
  nama: String,
  user_id: String,
  jumlah_hari_kerja: Number,
})

module.exports = mongoose => {
  const JadwalKerja = mongoose.model(
    "JadwalKerja",
    mongoose.Schema(
      {
        nama: {
          type: String,
          unique: true,
        },
        bulan: String,
        tahun: Number,
        hari_libur: HariLiburSchema,
        kuota_posisi: KuotaPosisiSchema,
        kuota_perorangan: [KuotaPeroranganSchema],
        is_active: Boolean,
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return JadwalKerja;
};
