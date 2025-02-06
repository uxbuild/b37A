// imports..
const prisma = require("../../../prisma/prismaClient");

// -----------------------------------
// Create a new review for an item
const createReview = async (userId, itemId, text, rating) => {
  try {
    // Ensure the user has not already reviewed this item
    const existingReview = await prisma.review.findFirst({
      where: { userId, itemId },
    });

    if (existingReview) {
      throw new Error("You can only leave one review per item.");
    }

    // Create the review if it doesn't exist
    const created = await prisma.review.create({
      data: {
        text,
        rating,
        itemId,
        userId,
      },
    });
    // update item avg rating..
    await updateAvgRating(updated.itemId);
    return created;
  } catch (error) {
    throw new Error(error.message || "Error creating review");
  }
};

// -----------------------------------
// Get all reviews for a specific item
const getReviewsByItem = async (itemId) => {
  try {
    return await prisma.review.findMany({
      where: { itemId },
      include: {
        user: true, // Include the user who created the review
        comments: true, // Include related comments (optional)
      },
    });
  } catch (error) {
    throw new Error(error.message || "Error fetching reviews for item");
  }
};

// -----------------------------------
// Get a review by its ID
const getReviewById = async (reviewId) => {
  try {
    return await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: true, // Include the user who wrote the review
        comments: true, // Optionally include related comments
      },
    });
  } catch (error) {
    throw new Error(error.message || "Error fetching review by ID");
  }
};

// -----------------------------------
// Update a review's text and rating
const updateReviewById = async (reviewId, text, rating) => {
  console.log("*************");
  console.log("updateReview", `${reviewId}, ${text}, ${rating}`);

  //const rating = Number(rating);
  try {
    const updated = await prisma.review.update({
      where: { id: Number(reviewId) },
      data: { text, rating: Number(rating) },
    });
    // update item avg rating..
    await updateAvgRating(updated.itemId);
    // return updated review..
    return updated;
  } catch (error) {
    throw new Error(error.message || "Error updating review");
  }
};

// -----------------------------------
// delete review
const deleteReview = async (reviewId) => {
  console.log("*************");
  console.log("review service delete reviewId", reviewId);

  try {
    const deleted = await prisma.review.delete({
      where: { id: Number(reviewId) },
    });

    console.log("deleted item", deleted);

    // update item avg rating..
    await updateAvgRating(deleted.itemId);
    return deleted;
  } catch (error) {
    throw new Error(error.message || "Error deleting review");
  }
};

// -----------------------------------
// updateAvgRating
// const updateAvgRating = async (itemId) => {
//   console.log("**********");
//   console.log("review service updateAvgRating itemId:", itemId);

//   // get all reviews
//   const reviews = await prisma.review.findMany({
//     where: { id: Number(itemId) },
//   });

//   // how many..
//   console.log("reviews found", reviews.length);

//   const avgRating =
//     reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length ||
//     0;
//   const rounded = Math.round(avgRating);
//   // update average rating
//   const updated = await prisma.item.update({
//     where: { id: Number(itemId) },
//     data: { avgRating: rounded },
//   });
//   return updated;
// };

const updateAvgRating = async (itemId) => {
  try {
    // Convert itemId to a number to ensure it's correctly formatted for Prisma
    const idNum = Number(itemId);
    
    if (isNaN(idNum)) {
      throw new Error("Invalid itemId, must be a number.");
    }

    console.log("updateAvgRating: Checking itemId =", idNum);

    // Verify that the item actually exists in the database
    const itemExists = await prisma.item.findUnique({
      where: { id: idNum },
      select: { id: true }, // We only need to verify existence
    });

    if (!itemExists) {
      throw new Error(`Item with ID ${idNum} not found.`);
    }

    // Fetch all reviews for the item
    const reviews = await prisma.review.findMany({
      where: { id: idNum },
      select: { rating: true },
    });

    console.log(`updateAvgRating: Found ${reviews.length} reviews for itemId ${idNum}`);

    // If no reviews exist, set avgRating to 0
    const avgRating =
      reviews.length > 0
        ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
        : 0;

    console.log(`updateAvgRating: New avgRating for itemId ${idNum} = ${avgRating}`);

    // Update the Item table with the new average rating
    const updatedItem = await prisma.item.update({
      where: { id: idNum },
      data: { avgRating },
    });

    return updatedItem;
  } catch (error) {
    console.error("updateAvgRating ERROR:", error.message);
    throw new Error(error.message || "Error updating average rating.");
  }
};

// -----------------------------------
// get all reviews by user id..
const getReviewsByUserId = async (userId) => {
  console.log("*****************");
  console.log("review services getReviewsByUserId", userId);

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: userId }, // Filter reviews by userId
      select: {
        id: true,
        text: true,
        rating: true,
        itemId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return reviews;
  } catch (error) {
    throw new Error("Error retrieving reviews from database");
  }
};

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewById,
  updateReviewById,
  deleteReview,
  updateAvgRating,
  getReviewsByUserId,
};
