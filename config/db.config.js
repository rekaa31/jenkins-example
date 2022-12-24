require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password : process.env.DB_PASSWORD_DEV,
    database : process.env.DB_NAME_DEV,
    host : process.env.DB_HOST_DEV,
    port : process.env.DB_PORT_DEV,
    dialect : "mysql"
  },
  production: {
    username: process.env.DB_USER_PROD,
    password : process.env.DB_PASSWORD_PROD,
    database : process.env.DB_NAME_PROD,
    host : process.env.DB_HOST_PROD,
    port : process.env.DB_PORT_PROD,
    dialect: "mysql"
  }
}  