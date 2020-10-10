const router = require('express').Router();

const authRoutes = require('./auth');
const countryRoutes = require('./country');

router.use('/auth', authRoutes);
router.use('/country', countryRoutes);

module.exports = router;
