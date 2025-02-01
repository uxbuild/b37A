//imports

require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); // HTTP request logger

// Import route modules
const authRoutes = require("./routes/auth/authRoutes");
const itemRoutes = require("./routes/items/itemRoutes");
const reviewRoutes = require("./routes/reviews/reviewRoutes");
const commentRoutes = require("./routes/comments/commentRoutes");

// App
const app = express();

// Middleware (dev)
app.use(morgan("dev")); // Log HTTP requests (dev mode)

// Middleware (json)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/comments", commentRoutes);

// Error handling (no route match)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling (general)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
