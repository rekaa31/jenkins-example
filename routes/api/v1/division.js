const express = require("express");
const router = express.Router();
const { fetchAll } = require("../../../controllers/v1/Divisions/divisions.controller");

/* FETCH PROFILE */
router.get('/divisions', fetchAll);

module.exports = router;
