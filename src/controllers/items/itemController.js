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

// -----------------------
const getItemReviewById = async (req, res) => {
  try {
    const { itemId, reviewId } = req.params;
    const review = await itemService.getItemReviewById(itemId, reviewId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------
const getCommentsByReviewId = async (req, res) => {
  const { itemId, reviewId } = req.params;
  try {
    const comments = await itemService.getCommentsByReviewId(itemId, reviewId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -----------------------
// POST add review
const addReview = async (req, res) => {
  const { itemId } = req.params;
  const { text, rating } = req.body;
  const { userId } = req.user;

  if (!text || !rating) {
    return res.status(400).json({ message: "Text and rating are required" });
  }

  try {
    const review = await itemService.addReview(itemId, text, rating, userId);
    return res.status(201).json(review);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  getItemReviews,
  getItemReviewById,
  getCommentsByReviewId,
  addReview,
};
