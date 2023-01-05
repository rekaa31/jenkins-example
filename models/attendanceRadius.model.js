const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
  const AttendanceRadius = mongoose.model(
        "AttendanceRadius",
        mongoose.Schema(
            {
                type: {
                  type: String,
                  enum: ['CHECK_IN', 'CHECK_OUT'],
                },
                work_location : [Number],
                radius: Number, 
            },
            { timestamps: true }
        ).plugin(mongoosePaginate)
  );

  return AttendanceRadius;
};
