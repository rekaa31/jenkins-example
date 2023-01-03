var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne, update } = require("./../../../controllers/v1/Permissions/permissions.controller")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL PERMISSION */
router.get('/permissions', authMiddleware, fetchAll);

/* FETCH ONE PERMISSION */
router.get('/permission/:id', authMiddleware, fetchOne);

/* CREATE PERMISSION. */
router.post('/permission/create', authMiddleware, create);

/* UPDATE PERMISSION */
router.get('/permission/:id', authMiddleware, update);

module.exports = router;