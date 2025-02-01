// services/commentService.js
const prisma = require('../prisma/prismaClient');

// Create a new comment on a review
const createComment = async (userId, reviewId, text) => {
  try {
    // Ensure the user has not already commented on this review
    const existingComment = await prisma.comment.findFirst({
      where: { userId, reviewId },
    });

    if (existingComment) {
      throw new Error('You can only leave one comment per review for this item.');
    }

    // Create the comment if it doesn't exist
    return await prisma.comment.create({
      data: {
        text,
        reviewId,
        userId,
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error creating comment');
  }
};

// Get all comments for a review
const getCommentsByReview = async (reviewId) => {
  try {
    return await prisma.comment.findMany({
      where: { reviewId },
      include: {
        user: true,  // Include the user who made the comment
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error fetching comments for review');
  }
};

// Get all comments by the logged-in user
const getCommentsByUser = async (userId) => {
  try {
    return await prisma.comment.findMany({
      where: { userId },
      include: {
        review: true,  // Include the review the comment is associated with
        user: true,    // Include the user who made the comment
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error fetching user comments');
  }
};

// Update an existing comment
const updateComment = async (commentId, text) => {
  try {
    return await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });
  } catch (error) {
    throw new Error(error.message || 'Error updating comment');
  }
};

// Delete a comment
const deleteComment = async (commentId) => {
  try {
    return await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    throw new Error(error.message || 'Error deleting comment');
  }
};

module.exports = {
  createComment,
  getCommentsByReview,
  getCommentsByUser,
  updateComment,
  deleteComment
};
