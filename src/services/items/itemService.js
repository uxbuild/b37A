// imports..
const prisma = require("../../../prisma/prismaClient");

// --------------------------
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

// --------------------------
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

// --------------------------
// Get reviews by item id
const getItemReviews = async (itemId) => {
  console.log("getItemReviews, itemId", itemId);

  try {
    return await prisma.review.findMany({
      where: { itemId: Number(itemId) }, // Use parsedItemId as a number
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

// --------------------------
const getItemReviewById = async (itemId, reviewId) => {
  console.log("**************");
  console.log(`items service: getItemReviewById: ${itemId}, ${reviewId}`);

  try {
    const review = await prisma.review.findUnique({
      // what is standard practice for handling numeric IDs..
      where: {
        id: Number(reviewId),
        itemId: Number(itemId),
      },
      // For unprotected routed, which fields should be display and hidden..??
      select: {
        id: true,
        text: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        itemId: true,
      },
    });

    // review not found
    if (!review) {
      throw new Error("Item review not found.");
    }
    console.log("review by id found", review);
    return review;
  } catch (error) {
    // get error specifics..
    throw new Error(`Error retrieving item review: ${error.message}`);
  }
};
// --------------------------
// GET api/items/:id/reviews/:id/comments
// Is it necessary to validate that the comment belong to the item if it already belongs to the review on that item.
const getCommentsByReviewId = async (itemId, reviewId) => {
  try {
    return await prisma.comment.findMany({
      where: {
        reviewId: Number(reviewId),
        // itemId: itemId,
      },
      select: {
        id: true,
        text: true,
        reviewId: true,
      },
    });
  } catch (error) {
    throw new Error(`Error retrieving comments by review id: ${error.message}`);
  }
};

// --------------------------
const addReview = async (itemId, text, rating, userId) => {
    console.log('item service addReview', `itemId: ${itemId}, text: ${text}, rating: ${rating}`);
    
  try {
    // get item..
    const item = await prisma.item.findUnique({
      where: { id: Number(itemId) },
    });

    console.log('item found', item);
    
    // if not found..
    if (!item) {
      throw new Error("Item not found.");
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        text,
        rating,
        itemId: Number(itemId),
        userId: Number(userId),
      },
    });

    
    // get new average rating..
    const avgRating = await getAvgRating(review.itemId);

    // update item with average rating..
    await prisma.item.update({
      where: { id: review.itemId },
      data: { avgRating: avgRating },
    });

    return review;
  } catch (error) {
    throw new Error("Error adding review: " + error.message);
  }
};
// ----------------
// Helper function to calculate the average rating
const getAvgRating = async (itemId) => {
  const reviews = await prisma.review.findMany({
    where: { itemId: Number(itemId) }, // Get all reviews for the item
  });

  if (reviews.length === 0) return 0; // If no reviews, return 0

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = totalRating / reviews.length;

  return avgRating;
};
// --------------------

module.exports = {
  getAllItems,
  getItemById,
  getItemReviews,
  getItemReviewById,
  getCommentsByReviewId,
  addReview,
};
