// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');  // Import JWT for token verification

// Middleware to protect routes and ensure the user is authenticated
const protect = async (req, res, next) => {
  let token;

  // Check if the token is in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token and attach the user to the request object
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Store user info in req.user
      next();  // Proceed to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Generalized ownership check for any model
const checkOwnership = (model) => async (req, res, next) => {
  const { userId } = req.user;  // Extract the userId from the authenticated user (stored in req.user)

  // Find the model instance by its unique ID (e.g., reviewId, commentId)
  const item = await model.findUnique({
    where: { id: req.params[`${model.name.toLowerCase()}Id`] },  // Get model instance based on the dynamic ID param
  });

  if (!item || item.userId !== userId) {
    return res.status(403).json({ message: 'You are not authorized to perform this action' });
  }

  next();  // If ownership is verified, proceed to the next middleware/controller
};

module.exports = { protect, checkOwnership };
