// controllers/reviewController.js
const reviewService = require("../../services/reviews/reviewService");

// -----------------------------------------
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
// -----------------------------------------
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

// -----------------------------------------
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

// -----------------------------------------
// Controller for updating a review
const updateReviewById = async (req, res) => {
  console.log('****************');
  
  console.log('review controller');
  
  // review id in request url..
  const { reviewId } = req.params;
  // console.log('');
  
  // review data in request body..
  const { text, rating } = req.body;

  try {
    const updatedReview = await reviewService.updateReviewById(
      reviewId,
      text,
      rating
    );

    // get itemId from review, update average rating.
    const { itemId } = updatedReview;
    await reviewService.updateAvgRating(itemId);

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------
// Controller for deleting a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // delete
    const deletedReview = await reviewService.deleteReview(reviewId);

    // update average rating
    await reviewService.updateAvgRating(deletedReview.itemId);

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------
// get all my reviews..
const getMyReviews = async (req, res) => {
  console.log("***********************");
  console.log("review controller getMyReviews", req.user.id);

  try {
    const userId = req.user.userId;
    const reviews = await reviewService.getReviewsByUserId(userId);
    // if none found..
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found." });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reviews" });
  }
};

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewById,
  updateReviewById,
  deleteReview,
  getMyReviews,
};
