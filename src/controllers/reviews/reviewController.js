// controllers/reviewController.js
const reviewService = require("../../services/reviews/reviewService");

// Controller for creating a review
const createReview = async (req, res) => {
  const { userId, itemId, text, rating } = req.body;

  try {
    const review = await reviewService.createReview(
      userId,
      itemId,
      text,
      rating
    );

    // update average rating
    await reviewService.updateAvgRating(itemId);

    res.status(201).json(review); // Respond with the created review
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all reviews for an item
const getReviewsByItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const reviews = await reviewService.getReviewsByItem(itemId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting a single review by ID
const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for updating a review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { text, rating } = req.body;

  try {
    const updatedReview = await reviewService.updateReview(
      reviewId,
      text,
      rating
    );

    // update average rating
    await reviewService.updateAvgRating(itemId);

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // delete
    const deletedReview = await reviewService.deleteReview(reviewId);

    // update average rating
    await reviewService.updateAvgRating(itemId);

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewById,
  updateReview,
  deleteReview,
};
