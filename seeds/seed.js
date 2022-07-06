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

  const chirp  = await Chirp.bulkCreate(chirpData);

  const comments = await Comments.bulkCreate(commentsData);
  
  process.exit(0);
};


seedDatabase();

