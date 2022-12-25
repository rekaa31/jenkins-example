var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne, update } = require("./../../../controllers/v1/Permissions/permissions.controller")


/* FETCH ALL PERMISSION */
router.get('/permissions', fetchAll);

/* FETCH ONE PERMISSION */
router.get('/permission/:id', fetchOne);

/* CREATE PERMISSION. */
router.post('/permission/create', create);

/* UPDATE PERMISSION */
router.get('/permission/:id', update);

module.exports = router;