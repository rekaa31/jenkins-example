const db = require("./../models");

async function checkDbConnection() {
    db.sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

module.exports = {
    checkDbConnection
}