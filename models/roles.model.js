const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = mongoose => {
    const Roles = mongoose.model(
        "Roles",
        mongoose.Schema(
            {
                name: String,
                code: String,
                permissions: mongoose.Schema.Types.Mixed
            },
            { timestamps: true }
        ).plugin(mongoosePaginate)
    );

    return Roles;
};
