// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
// prisma client..
const prisma = require('../../prisma/prismaClient');

// middleware token authorization (login)..
const protect = async (req, res, next) => {
  console.log("*************");
  console.log("protect req", req.headers.authorization);

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
      console.log("decoded user", req.user);

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

// looks for an id in the request path..
const checkOwnership = (modelName, fieldName) => async (req, res, next) => {
  console.log('*********');
  console.log('checkOwnership', `${modelName}, ${fieldName}`);
  
  
  try {
    const { userId } = req.user;  // Get authenticated user's ID from the token
    console.log('userId', userId);
    
    const { id } = req.params;     // Get the resource ID (from the route params)
    console.log('req id', id);
    
    // Dynamically fetch the model using the modelName and check ownership
    const resource = await prisma[modelName].findUnique({
      where: { id: Number(id) },  // Find the resource by its ID
    });

    if (!resource) {
      return res.status(404).json({ message: `${modelName} not found` });
    }

    // check authenticated user is owner (match userId with fieldName)
    if (resource[fieldName] !== userId) {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }

    // proceed to next middleware..
    console.log('proceed with ownership..');
    
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking ownership' });
  }
};

module.exports = { protect, checkOwnership };
