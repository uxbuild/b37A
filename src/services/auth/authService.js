
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../../prisma/prismaClient');


// REGISTER
const registerUser = async (email, password, firstName, lastName) => {
  console.log('api auth register service', `${email}, ${password}`);
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
    });
  } catch (error) {
    throw new Error(error.message || 'Error registering user');
  }
};

// LOGIN
const authenticateUser = async (email, password) => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, user };
  } catch (error) {
    throw new Error(error.message || 'Error authenticating user');
  }
};

// GET USER DATA
const getMe = async (userId) => {
  try {
    // Fetch the user from the database using their ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(error.message || 'Error fetching user details');
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  getMe
};
