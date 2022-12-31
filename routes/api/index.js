var express = require('express');
var router = express.Router();
var API_PERMISSIONS = require('./v1/permission');
var API_ROLES = require('./v1/role');
var API_USERS = require('./v1/user');
var API_ATTENDANCES = require('./v1/attendance');
var API_AUTH = require('./v1/auth');
var API_PROFILE = require('./v1/profile');

router.use('/v1/', API_PERMISSIONS);
router.use('/v1/', API_ROLES);
router.use('/v1/', API_USERS);
router.use('/v1/', API_ATTENDANCES);
router.use('/v1/', API_AUTH);
router.use('/v1/', API_PROFILE);

module.exports = router;