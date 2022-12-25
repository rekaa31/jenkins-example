const config = {
    url: `mongodb://${process.env.DB_HOST_DEV}:${process.env.DB_PORT_DEV}/${process.env.DB_NAME_DEV}`,
    options: {
        authSource: process.env.DB_SOURCE_DEV,
        user: process.env.DB_USER_DEV,
        pass: process.env.DB_PASSWORD_DEV,
    }
}

module.exports = {
    config
};