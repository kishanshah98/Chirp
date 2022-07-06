const router = require('express').Router();
const { Chirp, Comments, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    console.log('GET /api/chirps')
    try {
        const chirpData = await Chirp.findAll({
            attributes: [
                'id',
                'chirp',
            ],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comments', 'chirp_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    console.log('GET /api/chirps')
    try {
        const chirpData = await Chirp.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'chirp',
            ],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comments', 'chirp_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        })

        if (!chirpData) {
            res.status(404).json({ message: 'There is no chirp with this id' });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    console.log('POST /api/chirps');
    console.log(req.body);
    try {
        const chirpData = await Chirp.create({
            chirp: req.body.chirp,
            user_id: req.body.user_id,
        });
        res.render('dashboard',
            
        )
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.put('/:id', async (req, res) => {
    try {
        const chirpData = await Chirp.update({
            chirp: req.body.chirp,
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!chirpData) {
            res.status(404).json({ message: 'No chirp found with this id!' });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    console.log('DELETE /api/chirps/:id')
    try {
        const chirpData = await Chirp.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!chirpData) {
            res.status(404).json({ message: 'No chirp found with this id!' });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

