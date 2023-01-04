const express = require("express");
const { fetchAll, fetchOne, create, update } = require("../../../controllers/v1/AttendanceRadius/attendanceRadius.controller");
const router = express.Router();
const authMiddleware = require("../../../middleware/auth.middleware");

/* FETCH ALL RADIUS */
router.get('/attendance-radius', authMiddleware, fetchAll);

/* FETCH ONE RADIUS */
router.get('/attendance-radius/:id', authMiddleware, fetchOne);

/* CREATE RADIUS */
router.post('/attendance-radius', authMiddleware, create);

/* UPDATE RADIUS */
router.put('/attendance-radius/:id', authMiddleware, update);

module.exports = router;
