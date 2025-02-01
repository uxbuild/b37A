// /src/app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the item routes
app.use('/api/items', itemRoutes);

// Use the review routes
app.use('/api', reviewRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
