
// Ensure you have Prisma client instance
const prisma = require('../prisma/prismaClient');

// Service function to get the current user's profile
const getUserProfile = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        // createdAt: true,
        // updatedAt: true
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Service function to update a user's profile..
// not needed for this assignment)

module.exports = {
  getUserProfile,
};
