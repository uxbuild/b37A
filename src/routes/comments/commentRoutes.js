// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/comments/commentController');
const { protect, checkOwnership } = require('../../middleware/authMiddleware');

// Get my comments..
router.get('/me', protect, commentController.getMyComments);

// PUT edit my comment..
router.put("/:commentId", protect, checkOwnership('Comment', 'commentId'), commentController.updateComment);

// DELETE my comment..
router.delete("/:commentId", protect, checkOwnership('Comment', 'commentId'), commentController.deleteComment);


module.exports = router;
