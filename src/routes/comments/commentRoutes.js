// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/comments/commentController');
const { protect, checkOwnership } = require('../../middleware/authMiddleware');
const { Comment } = require('@prisma/client');

// Get my comments..
router.get('/me', protect, commentController.getMyComments);



// Create a new comment
router.post('/api/items/:itemId/reviews/:reviewId/comments', protect, commentController.createComment);

// Get comments for a review
router.get('/api/items/:itemId/reviews/:reviewId/comments', commentController.getCommentsByReview);


// Update an existing comment
router.put('/api/comments/:commentId', protect, checkOwnership(Comment), commentController.updateComment);

// Delete a comment
router.delete('/api/comments/:commentId', protect, checkOwnership(Comment), commentController.deleteComment);

module.exports = router;
