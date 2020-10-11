const router = require('express').Router();

const { currencyControllers: cc, authControllers: ac } = require('../controllers');

router.use('*', ac.validateToken, ac.rateLimit);

router.route('/all').get(cc.currenciesList);

module.exports = router;
