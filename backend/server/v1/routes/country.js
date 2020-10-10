const router = require('express').Router();

const { countryControllers: cc, authControllers: ac } = require('../controllers');

router.use('*', ac.validateToken);

router.route('/search').get(cc.search);

module.exports = router;
