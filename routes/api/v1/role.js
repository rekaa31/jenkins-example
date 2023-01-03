var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne } = require("./../../../controllers/v1/Roles/roles.controllers")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL PERMISSION */
router.get('/roles', authMiddleware, fetchAll);

// /* FETCH ONE PERMISSION */
router.get('/role/:id', authMiddleware, fetchOne);

/* CREATE PERMISSION. */
router.post('/role/create', authMiddleware, create);

// /* UPDATE PERMISSION */
// router.get('/permission/:id', update);

module.exports = router;