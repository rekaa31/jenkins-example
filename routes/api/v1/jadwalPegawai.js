var express = require('express');
var router = express.Router();
var { fetchAll, fetchOneById, create } = require("../../../controllers/v1/JadwalPegawai/jadwalPegawai.controller")
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH ALL JADWAL PEGAWAI */
router.get('/jadwal-pegawai', authMiddleware, fetchAll);

/* FETCH ONE JADWAL PEGAWAI */
router.get('/jadwal-pegawai/:id', authMiddleware, fetchOneById);

/* CREATE JADWAL PEGAWAI */
router.post('/jadwal-pegawai/create', authMiddleware, create);

module.exports = router;
