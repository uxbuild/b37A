// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviews/reviewController");
const { protect, checkOwnership } = require("../../middleware/authMiddleware");
const { Review } = require("@prisma/client");


// GET /api/reviews/me
router.get("/me", protect, reviewController.getMyReviews);

// CREATE a review
// router.post(
//   "/api/items/:itemId/reviews",
//   protect,
//   reviewController.createReview
// );

// GET reviews by item DONE
// router.get("/api/items/:itemId/reviews", reviewController.getReviewsByItem);

// GET specific review by ID
// router.get("/api/reviews/:reviewId", reviewController.getReviewById);

// Route for updating a review
// router.put(
//   "/api/reviews/:reviewId",
//   protect,
//   checkOwnership(Review),
//   reviewController.updateReview
// );

// Route for deleting a review
// router.delete(
//   "/api/reviews/:reviewId",
//   protect,
//   checkOwnership(Review),
//   reviewController.deleteReview
// );

module.exports = router;
