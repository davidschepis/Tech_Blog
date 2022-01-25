const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBlog = require('./blogData');
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  console.info("\nUsers are seeded!\n\n");

  await seedBlog();
  console.info("\nBlog posts are seeded!\n\n");

  await seedComment();
  console.info("\nComments are seeded!\n\n");

  process.exit(0);
};

seedAll();
