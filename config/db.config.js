const config = {
    url: `mongodb://127.0.0.1:27017/${process.env.DB_NAME_DEV}`,
    options: {
        authSource: "admin",
        user: "root",
        pass: "123!@#apotekasli!@#123",
    }
}

module.exports = {
    config
};