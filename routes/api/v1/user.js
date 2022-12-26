var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne, verification } = require("./../../../controllers/v1/Users/users.controller")


/* FETCH ALL PERMISSION */
router.get('/users', fetchAll);

/* FETCH ONE PERMISSION */
router.get('/user/:id', fetchOne);

/* CREATE PERMISSION. */
router.post('/user/create', create);

/* CREATE VERIFICATION. */
router.put('/user/:id/verification', verification);

// /* UPDATE PERMISSION */
// router.get('/permission/:id', update);

module.exports = router;