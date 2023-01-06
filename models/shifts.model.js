const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const Shift = mongoose.model(
    "Shift",
    mongoose.Schema(
      {
        shift: String,
        start_time: String,
        end_time: String,
        toleransi: Number,
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return Shift;
};