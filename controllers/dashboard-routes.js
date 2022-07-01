const router = require("express").Router();
const { Chirp, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

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
      console.log(chirps);
      res.render('dashboard', { 
        chirps,
        // logged_in: req.session.logged_in
      });
      // res.json(postData)
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/profile', async (req, res) => {
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


  
module.exports = router