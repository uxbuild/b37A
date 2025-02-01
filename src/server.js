// /src/app.js or /src/server.js

const express = require('express');
const morgan = require('morgan'); // HTTP request logger

const app = express();

// Import route modules
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Middleware
app.use(morgan('dev')); // Log HTTP requests in dev mode

// Middleware for parsing JSON bodies
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);  // Register, login, get current user

// User routes not defined in this assignment.

// Item routes
app.use('/api/items', itemRoutes);  // Get items, item details, reviews by item

// Review routes
app.use('/api/items/:itemId/reviews', reviewRoutes);  // Create review, get reviews, review details
app.use('/api/reviews/me', reviewRoutes);  // Get reviews by current user
app.use('/api/reviews/:reviewId', reviewRoutes);  // Update, delete specific review

// Comment routes
app.use('/api/items/:itemId/reviews/:reviewId/comments', commentRoutes); // Create, get, update, delete comments on review
app.use('/api/comments/me', commentRoutes);  // Get comments by current user
app.use('/api/comments/:commentId', commentRoutes);  // Update, delete specific comment

// Error handling middleware (if no route matched)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
