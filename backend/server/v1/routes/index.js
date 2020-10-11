const router = require('express').Router();

const authRoutes = require('./auth');
const countryRoutes = require('./country');
const currencyRoutes = require('./currency');

router.use('/auth', authRoutes);
router.use('/country', countryRoutes);
router.use('/currency', currencyRoutes);

module.exports = router;
