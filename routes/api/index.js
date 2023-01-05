var express = require('express');
var router = express.Router();
var API_PERMISSIONS = require('./v1/permission');
var API_ROLES = require('./v1/role');
var API_USERS = require('./v1/user');
var API_ATTENDANCES = require('./v1/attendance');
var API_AUTH = require('./v1/auth');
var API_PROFILE = require('./v1/profile');
var API_DIVISION = require('./v1/division');
var API_JADWAL_KERJA = require('./v1/jadwalKerja');
var API_JABATAN = require('./v1/jabatan');
var API_SHIFTS = require('./v1/shifts');
var API_RADIUS = require('./v1/attendanceRadius');

router.use('/v1/', API_PERMISSIONS);
router.use('/v1/', API_ROLES);
router.use('/v1/', API_USERS);
router.use('/v1/', API_ATTENDANCES);
router.use('/v1/', API_AUTH);
router.use('/v1/', API_PROFILE);
router.use('/v1/', API_DIVISION);
router.use('/v1/', API_JADWAL_KERJA);
router.use('/v1/', API_JABATAN);
router.use('/v1/', API_SHIFTS);
router.use('/v1/', API_RADIUS);

module.exports = router;