const router = require('express').Router();

const { authControllers: ac } = require('../controllers');

router.route('/login').post(ac.login);

module.exports = router;
