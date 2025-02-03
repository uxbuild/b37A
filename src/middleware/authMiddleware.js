// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");


// Middleware to protect routes and ensure the user authenticated
const protect = async (req, res, next) => {
  console.log('*************');
  console.log('protect req', req.headers);
  
  let token;

  // Check for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token,  attach user to request
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // proceed to next middleware..
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
 
};

// Generalized ownership check for any model
const checkOwnership = (model) => async (req, res, next) => {
  // Get userId from authenticated req.user
  const { userId } = req.user;

  // Find model instance by unique ID (e.g., reviewId, commentId)
  const item = await model.findUnique({
    where: { id: req.params[`${model.name.toLowerCase()}Id`] }, // Get model instance based on the dynamic ID param
  });

  if (!item || item.userId !== userId) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
  }

  // proceed to next middleware..
  next();
};

module.exports = { protect, checkOwnership };
