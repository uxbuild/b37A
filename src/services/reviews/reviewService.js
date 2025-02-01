// services/reviewService.js
const prisma = require('../prisma/prismaClient');

// Create a new review for an item
const createReview = async (userId, itemId, text, rating) => {
  try {
    // Ensure the user has not already reviewed this item
    const existingReview = await prisma.review.findFirst({
      where: { userId, itemId },
    });

    if (existingReview) {
      throw new Error('You can only leave one review per item.');
    }

    // Create the review if it doesn't exist
    return await prisma.review.create({
      data: {
        text,
        rating,
        itemId,
        userId,
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error creating review');
  }
};

// Get all reviews for a specific item
const getReviewsByItem = async (itemId) => {
  try {
    return await prisma.review.findMany({
      where: { itemId },
      include: {
        user: true,  // Include the user who created the review
        comments: true, // Include related comments (optional)
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error fetching reviews for item');
  }
};

// Get a review by its ID
const getReviewById = async (reviewId) => {
  try {
    return await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: true,   // Include the user who wrote the review
        comments: true, // Optionally include related comments
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error fetching review by ID');
  }
};

// Update a review's text or rating
const updateReview = async (reviewId, text, rating) => {
  try {
    return await prisma.review.update({
      where: { id: reviewId },
      data: { text, rating },
    });
  } catch (error) {
    throw new Error(error.message || 'Error updating review');
  }
};

// Delete a review and its associated comments (optional cascade)
const deleteReview = async (reviewId) => {
  try {
    return await prisma.review.delete({
      where: { id: reviewId },
      include: { comments: true },  // Optionally include comments for deletion
    });
  } catch (error) {
    throw new Error(error.message || 'Error deleting review');
  }
};

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewById,
  updateReview,
  deleteReview,
};
