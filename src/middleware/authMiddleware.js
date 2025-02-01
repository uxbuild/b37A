// middleware/authMiddleware.js
const { Review } = require('@prisma/client');  // Import Prisma Review model

// Middleware to check if the user is the owner of the review
const checkOwnership = (model) => async (req, res, next) => {
  const { userId } = req.user;  // Extract user ID from the JWT token

  // Check if the review exists and belongs to the authenticated user
  const review = await model.findUnique({
    where: { id: req.params.reviewId },  // Get review by reviewId from the URL params
  });

  if (!review || review.userId !== userId) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }

  next();  // If ownership is verified, proceed to the next middleware/controller
};

module.exports = { protect, checkOwnership };
