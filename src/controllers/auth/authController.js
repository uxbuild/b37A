// controllers/userController.js
const authService = require('../../services/auth/authService');

// Controller for user registration
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.registerUser(email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for user login (authentication)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authService.authenticateUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
