// /src/app.js
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/user/userRoutes");
const itemRoutes = require("./routes/items/itemRoutes");
const reviewRoutes = require("./routes/reviews/reviewRoutes");

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the auth routes
app.use("/api/auth", authRoutes);

// Use the user routes (protected, so require JWT middleware) - may not be needed for this assignment.
// app.use('/api/users', userRoutes);

// Use the item routes
app.use("/api/items", itemRoutes);

// Use the review routes
app.use("/api", reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
