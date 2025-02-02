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

module.exports = { getAllItems, getItemById, getItemReviews };
