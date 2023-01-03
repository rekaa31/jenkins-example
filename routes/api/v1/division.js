const express = require("express");
const router = express.Router();
const { fetchAll } = require("../../../controllers/v1/Divisions/divisions.controller");
const authMiddleware = require('../../../middleware/auth.middleware');

/* FETCH PROFILE */
router.get('/divisions', authMiddleware, fetchAll);

module.exports = router;
