module.exports = mongoose => {
  const Attendances = mongoose.model(
      "Attendances",
      mongoose.Schema(
          {
              name: String,
              location: [Number],
              status_presensi_awal: {
                type: String,
                enum: ["TIDAK MASUK", "TEPAT WAKTU", "TERLAMBAT"]
              }, 
              status_presensi_akhir: {
                type: String,
                enum: ["TIDAK MASUK", "TEPAT WAKTU", "TERLAMBAT"]
              }
          },
          { timestamps: true }
      )
  );

  return Attendances;
};
