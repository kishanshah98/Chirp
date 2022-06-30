const sequelize = require('../config/connection');
const { User, Chirp, Comments } = require('../models');

const userData = require('./userData.json');

// const userData =
// [
//   {
//       "user_name": "Java-Monster",
//       "email": "javamon@email.com",
//       "password": "1234"
//   },
//   {
//     "user_name": "King-Python",
//     "email": "kingpython@email.com",
//     "password": "pass1234"
//   }
// ];

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

  // for (const chirp of chirpData) {
  //   await Chirp.create({
  //     ...chirp,
  //     user_id: users[Math.floor(Math.random() * 1000000000)].id,
  //   });
  // }

  // for (const comments of commentsData) {
  //   await Comments.create({
  //     ...comments,
  //     chirp_id: users[Math.floor(Math.random() * 1000000000)].id,
  //   });
  // }

  
  process.exit(0);
};


seedDatabase();

