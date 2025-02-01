const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', userController.registerUser);

// POST /api/auth/login
router.post('/login', userController.loginUser);

// GET /api/users/me (Protected route)
router.get('/me', protect, userController.getMe);  // You can define a `getMe` controller function to fetch the logged-in user's details

module.exports = router;
