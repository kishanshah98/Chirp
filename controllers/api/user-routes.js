const router = require("express").Router();
const { User, Chirp, Comments } = require("../../models");
const passport = require("../../config/passport");

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Chirp,
                    attributes: ['id', 'chirp'],
                },
                {
                    model: Comments,
                    attributes: ['id', 'comments', 'created_at'],
                    include: {
                        model: Chirp,
                        attributes: ['chirp']
                    }
                },
            ]
        })

        if (!userData) {
            res.status(404).json({ message: 'There is no user with this id' });
            return;
        }

        res.json(userData)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            user_name: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        })

        //   ========================= passport ===========================
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username
            req.session.logged_in = true;
            //  ===========================================================
            res.json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }
        //  =========================  PASSPORT ===========================================
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            //  ===============================================================================
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/signout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', async (req, res) => {
    console.log('PUT /api/users/:id');
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        console.log(userData);
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//  ================================= PASSPORT ======================================
// Login
router.post("/signin", passport.authenticate("local"), async (req, res) => {
    console.log("POST /api/user/signin");

    try {
        res
            .status(200)
            .json({ user: req.user, message: "You are now logged in!" });
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
});

// CREATE new user thru signup
router.post("/signup", async (req, res) => {
    console.log("POST /api/users/signup");
    try {
        const dbUserData = await User.create({
            user_name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // res.redirect(307, "/api/user/login");
        // Or redirect to login web page
        res.redirect("/signin");
    } catch (err) {
        console.log(err.errors[0]);
        res.status(500).json({ messge: err.errors[0]["message"] });
    }
});

router.get("/user_data", (req, res) => {
    console.log("GET /api/user/user_data");
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            user_name: req.user.username,
            email: req.user.email,
            id: req.user.id
        });
    }
});

// Logout

// router.get("/signput", (req, res) => {
//     console.log("GET - /api/user/logout");
//     if (req.user) {
//         req.logout();
//         res.redirect("/");
//     } else {
//         res.status(404).end();
//     }
// });

module.exports = router;