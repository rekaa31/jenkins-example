const express = require("express");
const router = express.Router();
const { login, refreshToken } = require("../../../controllers/v1/Auth/auth.controller");

/* LOGIN AUTH */
router.post('/auth/login', login);

/* REFRESH TOKEN */
router.post('/auth/refresh-token', refreshToken);

module.exports = router;