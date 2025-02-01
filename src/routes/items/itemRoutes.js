const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/items/itemController");

// Placeholder route to get all items
router.get("/", itemController.getAllItems);

// Placeholder route to get a specific item by its ID
router.get("/:itemId", itemController.getItemById);

// Placeholder route to get reviews for a specific item by its ID
router.get("/:itemId/reviews", itemController.getItemReviews);

module.exports = router;
