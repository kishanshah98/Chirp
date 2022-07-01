const router = require('express').Router();
const userRoutes = require('./user-routes');
const chirpRoutes = require('./chirp-routes');
const commentsRoutes = require('./comments-routes');

router.use('/users', userRoutes);
router.use('/chirps', chirpRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
