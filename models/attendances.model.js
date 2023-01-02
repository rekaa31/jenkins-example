const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const Attendances = mongoose.model(
        "Attendances",
        mongoose.Schema(
            {
                user_id: String,
                tanggal : String,
                type : String,
                presensi_detail: mongoose.Schema.Types.Mixed, 
            },
            { timestamps: true }
        ).plugin(mongoosePaginate)
  );

  return Attendances;
};
