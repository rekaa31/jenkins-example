const mongoose = require('mongoose');
const dbConfig = require('./../config/db.config')

function checkConnectionDb(){
    try {
        console.log(`${dbConfig.config.url}`)
        mongoose.connect(`${dbConfig.config.url}`, dbConfig.config.options).then((response) => {
            console.log("Connected to MongoDB")
            return true
        }).catch((error) => {
            console.error(error)
            return false
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    checkConnectionDb
}