var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne } = require("./../../../controllers/v1/Roles/roles.controllers")


/* FETCH ALL PERMISSION */
router.get('/roles', fetchAll);

// /* FETCH ONE PERMISSION */
router.get('/role/:id', fetchOne);

/* CREATE PERMISSION. */
router.post('/role/create', create);

// /* UPDATE PERMISSION */
// router.get('/permission/:id', update);

module.exports = router;