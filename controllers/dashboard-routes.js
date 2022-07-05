const router = require("express").Router();
const { Chirp, User, Comments } = require('../models');
const path = require('path');
const withAuth = require('../utils/auth');
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/', async (req, res) => {
    console.log("GET /")
    try {
      const postData = await Chirp.findAll({
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
        ],
      });
  
      const chirps = postData.map((post) => post.get({ plain: true }));
      // /console.log(chirps);
      res.render('dashboard', { 
        chirps,
        // logged_in: req.session.logged_in
      });
      // res.json(postData)
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/profile', isAuthenticated, async (req, res) => {
  console.log('GET /profile');
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Chirp }],
    });
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
//       logged_in: true
      
    });
    res.json(userData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/:id', async (req, res) => {
  console.log("GET /profile/:id");
  try {
    const chirpData = await Chirp.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comments }],
    });
    const chirp = chirpData.get({ plain: true });
    console.log(chirp);

    res.render('profile', {
      ...chirp,
//       logged_in: true
      
    });
    // res.json(chirpData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/signin', (req, res) => {
  console.log('GET /signin');
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('signin');
});

router.get('/signup', (req, res) => {
  console.log('GET /signup');
  res.render('signup');
});

module.exports = router