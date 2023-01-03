const express = require("express");
const router = express.Router();
const { fetchProfile, updateProfile } = require("../../../controllers/v1/Profile/profile.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

/* FETCH PROFILE */
router.get('/profile', authMiddleware, fetchProfile);

/* UPDATE PROFILE */
router.put('/profile/:id', authMiddleware, updateProfile);

module.exports = router;
