var express = require('express');
var router = express.Router();
var { create, fetchAll, fetchOne, verification, importData, update } = require("./../../../controllers/v1/Users/users.controller");
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL PERMISSION */
router.get('/users', authMiddleware, fetchAll);

/* FETCH ONE PERMISSION */
router.get('/user/:id', authMiddleware, fetchOne);

/* CREATE PERMISSION. */
router.post('/user/create', authMiddleware, create);

/* CREATE VERIFICATION. */
router.put('/user/:id/verification', authMiddleware, verification);

/* IMPORT USERS. */
router.post('/user/import', authMiddleware, importData);

/* UPDATE USER */
router.put('/user/:id', update);

module.exports = router;