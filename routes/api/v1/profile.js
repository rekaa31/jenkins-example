const express = require("express");
const router = express.Router();
const { fetchProfile, updateProfile } = require("../../../controllers/v1/Profile/profile.controller");

/* FETCH PROFILE */
router.get('/profile', fetchProfile);

/* UPDATE PROFILE */
router.put('/profile/:id', updateProfile);

module.exports = router;
