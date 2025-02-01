// /src/services/userService.js
const prisma = require('../prisma/client'); // Ensure you have Prisma client instance

// Service function to get the current user's profile
const getUserProfile = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { // Select only the fields you need
        id: true,
        // username: true,
        email: true,
        // createdAt: true,
        // updatedAt: true
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service function to update a user's profile.. (not required for this assignment)

module.exports = {
  getUserProfile,
//   updateUserProfile
};
