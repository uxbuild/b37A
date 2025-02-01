const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export the Prisma client instance to be reused throughout the app
module.exports = prisma;