const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
