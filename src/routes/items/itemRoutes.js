const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/items/itemController");

// GET all items
router.get("/", itemController.getAllItems);

// GET item by id
router.get("/:itemId", itemController.getItemById);

// GET all reviews of an item
router.get("/:itemId/reviews", itemController.getItemReviews);

// POST create a review for an item
router.post("/:itemId/reviews", itemController.addReviewByItemId);

// GET review by id from item reviews
router.get("/:itemId/reviews/:reviewId", itemController.getItemReviewById);

// GET all comments of item review by id
router.get('/:itemId/reviews/:reviewId/comments', itemController.getCommentsByReviewId);


module.exports = router;
