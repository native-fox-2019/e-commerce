const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');

router.use('/', userRoutes);
router.use('/products', productRoutes);

module.exports = router;