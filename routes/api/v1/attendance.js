const express = require("express");
const router = express.Router();
const { fetchAll, fetchOne, checkIn, checkOut } = require("./../../../controllers/v1/Attendances/attendances.controller");

/* FETCH ALL ATTENDANCE */
router.get('/attendances', fetchAll);

/* FETCH ONE ATTENDACE */
router.get('/attendance/:id', fetchOne);

/* CREATE ATTENDANCE. */
router.post('/attendance/check-in', checkIn);

/* CREATE ATTENDANCE. */
router.post('/attendance/check-out', checkOut);

module.exports = router;