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
db.attendances = require("./attendances.model.js")(mongoose);
db.jadwalKerja = require("./jadwalKerja.model.js")(mongoose);
db.jabatan = require("./jabatan.model.js")(mongoose);
db.shifts = require("./shifts.model.js")(mongoose);
db.attendanceRadius = require("./attendanceRadius.model.js")(mongoose);

module.exports = db;