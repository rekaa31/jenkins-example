const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const Shift = mongoose.model(
    "Shift",
    mongoose.Schema(
      {
        shift: String,
        jam: String,
        toleransi: Number,
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return Shift;
};