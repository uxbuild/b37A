// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/comments/commentController');
const { protect, checkOwnership } = require('../../middleware/authMiddleware');

// Get my comments..
router.get('/me', protect, commentController.getMyComments);


module.exports = router;
