const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.config.url;

db.permissions = require("./permissions.model.js")(mongoose);
db.roles = require("./roles.model.js")(mongoose);
db.users = require("./users.model.js")(mongoose);
db.divisions = require("./divisions.model.js")(mongoose);

module.exports = db;