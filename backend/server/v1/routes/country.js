const router = require('express').Router();

const { countryControllers: cc, authControllers: ac } = require('../controllers');

router.use('*', ac.validateToken, ac.rateLimit);

router.route('/search').get(cc.search);

module.exports = router;
