const express = require("express");
const router = express.Router();
const { fetchProfile } = require("../../../controllers/v1/Profile/profile.controller");

/* FETCH PROFILE */
router.get('/profile', fetchProfile);

module.exports = router;
