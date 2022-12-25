module.exports = mongoose => {
    const Permissions = mongoose.model(
        "Permissions",
        mongoose.Schema(
            {
                name: String,
                code: {
                    type: String,
                    unique: true
                },
                menu_name: String
            },
            { 
                timestamps: true
            }
        )
    );

    return Permissions;
};

