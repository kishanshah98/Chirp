const sequelize = require('../config/connection');
const { User, Chirp, Comments } = require('../models');

const userData = require('./userData.json');
const chirpData = require('./chirpData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const chirp of chirpData) {
    await Chirp.create({
      ...chirp,
      user_id: users[Math.floor(Math.random() * 1000000000)].id,
    });
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
      chirp_id: users[Math.floor(Math.random() * 1000000000)].id,
    });
  }

  
  process.exit(0);
};


seedDatabase();