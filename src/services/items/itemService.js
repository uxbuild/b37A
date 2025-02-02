// imports..
const prisma = require("../../../prisma/prismaClient");

// Get all items..
const getAllItems = async () => {
  try {
    // Retrieve the items and their review counts
    const items = await prisma.item.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avgRating: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    // Modify result to include review count
    return items
      .map((item) => ({
        ...item,
        // include 'reviews'..
        reviews: item._count.reviews,
      }))
      .map((item) => {
        // remove _count
        const { _count, ...rest } = item;
        return rest;
      });
  } catch (error) {
    throw new Error("Error retrieving ALL items.");
  }
};

// Get item by id
const getItemById = async (itemId) => {
  console.log("***");
  console.log("getItemById item id: ", itemId);
  const idNum = Number(itemId);

  try {
    // get item..
    const item = await prisma.item.findUnique({
      where: { id: idNum },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avgRating: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });
    // item not found..
    if (!item) {
      throw new Error("Item not found.");
    }
    const itemWithReviewCount = {
      ...item,
      reviews: item._count.reviews, // Add 'reviews' with count
    };

    const { _count, ...rest } = itemWithReviewCount;
    return rest; // Return the modified item without '_count'
    // return item;
  } catch (error) {
    // catch all..
    throw new Error(`Error retrieving ${error.message}`);
  }
};

// Get reviews by item id
const getItemReviews = async (itemId) => {
  console.log("getItemReviews, itemId", itemId);

  try {
    // Ensure itemId is a number (in case it's passed as a string)
    const parsedItemId = Number(itemId);

    if (isNaN(parsedItemId)) {
      throw new Error("Invalid itemId format.");
    }

    return await prisma.review.findMany({
      where: { itemId: parsedItemId }, // Use parsedItemId as a number
      select: {
        id: true,
        text: true,
        rating: true,
        itemId: true,
        userId: true,
      },
    });
  } catch (error) {
    throw new Error("Error retrieving item reviews.");
  }
};

module.exports = { getAllItems, getItemById, getItemReviews };
