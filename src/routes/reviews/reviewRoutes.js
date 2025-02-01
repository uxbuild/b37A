// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviews/reviewController");
const { protect, checkOwnerShip } = require("../../middleware/authMiddleware");
const { Review } = require("@prisma/client");

// Route for creating a review
router.post(
  "/api/items/:itemId/reviews",
  protect,
  reviewController.createReview
);

// Route for getting reviews by item
router.get("/api/items/:itemId/reviews", reviewController.getReviewsByItem);

// Route for getting a specific review by ID
router.get("/api/reviews/:reviewId", reviewController.getReviewById);

// Route for updating a review
router.put(
  "/api/reviews/:reviewId",
  protect,
  checkOwnerShip(Review),
  reviewController.updateReview
);

// Route for deleting a review
router.delete(
  "/api/reviews/:reviewId",
  protect,
  checkOwnerShip(Review),
  reviewController.deleteReview
);

module.exports = router;
