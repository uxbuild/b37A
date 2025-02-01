// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Create a new comment
router.post('/api/items/:itemId/reviews/:reviewId/comments', commentController.createComment);

// Get comments for a review
router.get('/api/items/:itemId/reviews/:reviewId/comments', commentController.getCommentsByReview);

// Get comments made by a specific user
router.get('/api/comments/me', commentController.getCommentsByUser);

// Update an existing comment
router.put('/api/comments/:commentId', commentController.updateComment);

// Delete a comment
router.delete('/api/comments/:commentId', commentController.deleteComment);

module.exports = router;
