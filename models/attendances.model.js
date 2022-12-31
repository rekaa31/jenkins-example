const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const Attendances = mongoose.model(
        "Attendances",
        mongoose.Schema(
            {
                user_id: String,
                location: [Number],
                status_presensi_awal: {
                    type: String,
                    enum: ["TIDAK HADIR", "TEPAT WAKTU", "TERLAMBAT"],
                    default: "TIDAK HADIR",
                }, 
                status_presensi_akhir: {
                    type: String,
                    enum: ["TIDAK HADIR", "TEPAT WAKTU", "TERLAMBAT"],
                    default: "TIDAK HADIR",
                }
            },
            { timestamps: true }
        ).plugin(mongoosePaginate)
  );

  return Attendances;
};
