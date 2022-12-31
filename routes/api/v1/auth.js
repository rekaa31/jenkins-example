const express = require("express");
const router = express.Router();
const { login } = require("../../../controllers/v1/Auth/auth.controller");

/* LOGIN AUTH */
router.post('/auth/login', login);

module.exports = router;