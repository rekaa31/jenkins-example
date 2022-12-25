module.exports = mongoose => {
    const Divisions = mongoose.model(
        "Divisions",
        mongoose.Schema(
            {
                name: String,
            },
            { timestamps: true }
        )
    );

    return Divisions;
};
