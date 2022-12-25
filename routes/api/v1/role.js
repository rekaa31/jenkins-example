var express = require('express');
var router = express.Router();
var { create } = require("./../../../controllers/v1/Roles/roles.controllers")


// /* FETCH ALL PERMISSION */
// router.get('/permissions', fetchAll);

// /* FETCH ONE PERMISSION */
// router.get('/permission/:id', fetchOne);

/* CREATE PERMISSION. */
router.post('/role/create', create);

// /* UPDATE PERMISSION */
// router.get('/permission/:id', update);

module.exports = router;