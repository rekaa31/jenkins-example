const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const Jabatan = mongoose.model(
    "Jabatan",
    mongoose.Schema(
      {
        name: String,
        code: {
          type: String,
          unique: true,
        },
        divisi: String // Id of division
      },
      { timestamps: true }
    ).plugin(mongoosePaginate)
  );

  return Jabatan;
};
