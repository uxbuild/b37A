const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');
const { protect } = require('../../middleware/authMiddleware');

// not editing user profile for this assignment
// const { protect, checkOwnership } = require('../../middleware/authMiddleware');

// Protected route, requires valid JWT token
router.get('/me', protect, userController.getMe);

// not using for this assignment
//router.put('/me', protect, checkOwnership('user'), userController.updateUser);

module.exports = router;
