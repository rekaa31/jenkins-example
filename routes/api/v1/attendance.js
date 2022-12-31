const express = require("express");
const router = express.Router();
const { create, fetchAll, fetchOne } = require("./../../../controllers/v1/Attendances/attendances.controller");

/* FETCH ALL ATTENDANCE */
router.get('/attendances', fetchAll);

/* FETCH ONE ATTENDACE */
router.get('/attendance/:id', fetchOne);

/* CREATE ATTENDANCE. */
router.post('/attendance/create', create);

module.exports = router;