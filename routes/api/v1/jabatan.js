var express = require('express');
var router = express.Router();
var { fetchAll, fetchOneById, create, update, deleteOne } = require("./../../../controllers/v1/Jabatan/jabatan.controller")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL SHIFTS */
router.get('/jabatan', authMiddleware, fetchAll);

/* FETCH ONE SHIFT */
router.get('/jabatan/:id', authMiddleware, fetchOneById);

/* CREATE SHIFT */
router.post('/jabatan/create', authMiddleware, create);

/* UPDATE SHIFT */
router.put('/jabatan/:id', authMiddleware, update);

/* DELETE SHIFT */
router.delete('/jabatan/:id', authMiddleware, deleteOne);

module.exports = router;
