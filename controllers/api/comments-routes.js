const router = require('express').Router();
const { Comments } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comments.findAll();
        console.log(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            where: {
                id: req.params.id
            }
        });
        console.log(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    console.log('POST /api/comments');
    console.log(req.body);
    // console.log(typeof req.session.chirp_id);
    console.log(typeof req.session.user_id);

    try {
        const commentData = await Comments.create({
            comments: req.body.comments,
            chirp_id: parseInt(req.body.chirpId),
            user_id: req.session.user_id,
        });
        res.render('profile')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comments.update({
            comments: req.body.comments
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
