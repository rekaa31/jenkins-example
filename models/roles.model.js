module.exports = mongoose => {
    const Roles = mongoose.model(
        "Roles",
        mongoose.Schema(
            {
                name: String,
                permissions: mongoose.Schema.Types.Mixed
            },
            { timestamps: true }
        )
    );

    return Roles;
};
