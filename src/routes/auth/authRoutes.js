const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const { protect } = require("../../middleware/authMiddleware");

// POST /api/auth/register
router.post("/register", authController.registerUser);

// POST /api/auth/login
router.post("/login", authController.loginUser);

// GET /api/auth/me
router.get("/me", protect, authController.getMe);

module.exports = router;
