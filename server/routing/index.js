const router = require('express').Router();
const product = require('./product');
const user = require('./user');

router.use('/users', user);
router.use('/products', product);

module.exports = router;