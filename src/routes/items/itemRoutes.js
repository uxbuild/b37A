const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/items/itemController");

// GET all items
router.get("/", itemController.getAllItems);

// GET item by id
router.get("/:itemId", itemController.getItemById);

// GET all review of an item
router.get("/:itemId/reviews", itemController.getItemReviews);

// POST create a review for an item
router.post("/:itemId/reviews", itemController.addReviewByItemId);

module.exports = router;
