const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const jobData = require('./jobData.json');
const practiceData = require('./practiceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of jobData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const post of practiceData) {
    await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

  process.exit(0);
};

seedDatabase();
