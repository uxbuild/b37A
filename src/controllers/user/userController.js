// /src/controllers/users/userController.js
const userService = require("../../services/userService");

// Controller function to get the current user's profile
const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // We get the user ID from the JWT payload
    const user = await userService.getUserProfile(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

// Controller function to update the current user's profile - not required for this assignment.)

module.exports = {
  getMe
  //   updateUser
};
