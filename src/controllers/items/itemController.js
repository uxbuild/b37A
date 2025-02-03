// functions for items..
// Placeholder route to get all items
// get all items.. /
// get item by id.. /itemId
// get item reviews.. /itemId/reviews

const itemService = require("../../services/items/itemService");

// Get all items..
const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await itemService.getItemById(itemId);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item reviews..
const getItemReviews = async (req, res) => {
  try {
    const { itemId } = req.params;
    const reviews = await itemService.getItemReviews(itemId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// TODO..
// -----------------------
const getItemReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await itemService.getItemReviewById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// -----------------------
const addReviewByItemId = async (req, res) => {
  const { itemId } = req.params; // Item ID from the URL
  const { text, rating, userId } = req.body; // Review data from request body

  try {
    // Call the service to handle the logic for adding a review
    const review = await itemService.addReview(itemId, { text, rating, userId });
    // Return the new review as response
    return res.status(201).json(review);
  } catch (error) {
    // Return error if any occurs
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllItems, getItemById, getItemReviews, addReviewByItemId, getItemReviewById };
