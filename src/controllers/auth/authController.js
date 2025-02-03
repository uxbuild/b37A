// imports..
const authService = require("../../services/auth/authService");

// Controller for user REGISTER DONE
const registerUser = async (req, res) => {
  console.log("api auth register controller", req);

  const { email, password, firstName, lastName } = req.body;

  // Verify required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await authService.registerUser(
      email,
      password,
      firstName,
      lastName
    );
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for user LOGIN (authentication) DONE
const loginUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const { token, user } = await authService.authenticateUser(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller get USER DATA.
const getMe = async (req, res) => {
  console.log("*********");
  console.log("auth me controller req.user", req.user);

  try {
    // User data attached to req object
    const user = await authService.getMe(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
