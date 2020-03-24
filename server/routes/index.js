const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const authentication = require('../middlewares/authentication');

router.use('/', userRoutes);
router.use(authentication);
router.use('/products', productRoutes);

module.exports = router;