var express = require('express');
var router = express.Router();
var API_PERMISSIONS = require('./v1/permission');
var API_ROLES = require('./v1/role');

router.use('/v1/', API_PERMISSIONS);
router.use('/v1/', API_ROLES);

module.exports = router;