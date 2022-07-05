const router = require('express').Router();
const userRoutes = require('./user-routes');
const chirpRoutes = require('./chirp-routes');
const commentsRoutes = require('./comments-routes');
const passport = require('../../config/passport')
const dashBoardRoutes = require('../dashboard-routes')

router.use('/users', userRoutes);
router.use('/chirps', chirpRoutes);
router.use('/comments', commentsRoutes);
router.use(dashBoardRoutes);

module.exports = router;
