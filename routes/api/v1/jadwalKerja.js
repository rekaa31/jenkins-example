var express = require('express');
var router = express.Router();
var { fetchAll, fetchOneById, create, update, deleteOne } = require("./../../../controllers/v1/JadwalKerja/jadwalKerja.controller")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL JADWAL KERJA */
router.get('/jadwal-kerja', authMiddleware, fetchAll);

/* FETCH ONE JADWAL KERJA */
router.get('/jadwal-kerja/:id', authMiddleware, fetchOneById);

/* CREATE JADWAL KERJA */
router.post('/jadwal-kerja/create', authMiddleware, create);

/* UPDATE JADWAL KERJA */
router.put('/jadwal-kerja/:id', authMiddleware, update);

/* DELETE JADWAL KERJA */
router.delete('/jadwal-kerja/:id', authMiddleware, deleteOne);

module.exports = router;
