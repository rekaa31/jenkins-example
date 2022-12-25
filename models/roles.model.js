module.exports = mongoose => {
    const Permissions = mongoose.model(
        "Roles",
        mongoose.Schema(
            {
                name: String,
                permissions: mongoose.Schema.Types.Mixed
            },
            { timestamps: true }
        )
    );

    return Permissions;
};
