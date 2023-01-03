const express = require("express");
const router = express.Router();
const { fetchAll, fetchOne, checkIn, checkOut, fetchOwn, checkAttendence } = require("./../../../controllers/v1/Attendances/attendances.controller");
const authMiddleware = require("../../../middleware/auth.middleware");


/* FETCH ALL ATTENDANCE */
router.get('/attendances', authMiddleware, fetchAll);

/* FETCH ALL ATTENDANCE */
router.get('/attendances/own', authMiddleware, fetchOwn);

/* CHECK ATTENDENCE. */
router.get('/attendance/status', authMiddleware, checkAttendence);

/* FETCH ONE ATTENDACE */
router.get('/attendance/:id', authMiddleware, fetchOne);

/* CREATE ATTENDANCE. */
router.post('/attendance/check-in', authMiddleware, checkIn);

/* CREATE ATTENDANCE. */
router.post('/attendance/check-out', authMiddleware, checkOut);



module.exports = router;