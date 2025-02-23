const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { validateProfile } = require("../middlewares/validation");

// Profile CRUD routes
router.post("/create", validateProfile,profileController.createProfile); // Create Profile
router.get("/profiles", profileController.getAllProfiles); // Get Profiles
router.put("/:email", validateProfile,profileController.updateProfile); // Update Profile
router.delete("/:email", profileController.deleteProfile); // Delete Profile

module.exports = router;
