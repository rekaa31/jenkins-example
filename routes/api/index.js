var express = require('express');
var router = express.Router();
var API_PERMISSIONS = require('./v1/permission');

router.use('/v1/', API_PERMISSIONS);

module.exports = router;