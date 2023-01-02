const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
    const Divisions = mongoose.model(
        "Divisions",
        mongoose.Schema(
            {
                name: String,
            },
            { timestamps: true }
        ).plugin(mongoosePaginate)
    );

    return Divisions;
};
