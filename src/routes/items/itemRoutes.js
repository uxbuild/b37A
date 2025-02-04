const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/items/itemController");
const { protect } = require("../../middleware/authMiddleware");

// GET all items
router.get("/", itemController.getAllItems);

// GET item by id
router.get("/:itemId", itemController.getItemById);

// GET all reviews of an item
router.get("/:itemId/reviews", itemController.getItemReviews);

// GET review by id from item reviews
router.get("/:itemId/reviews/:reviewId", itemController.getItemReviewById);

// GET all comments of item review by id
router.get('/:itemId/reviews/:reviewId/comments', itemController.getCommentsByReviewId);

// POST create a review for an item
router.post("/:itemId/reviews", protect, itemController.addReview);



module.exports = router;
