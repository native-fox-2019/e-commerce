const router=require('express').Router();
const product=require('./routes/product');
const auth=require('./routes/auth')
const banner=require('./routes/banner')

router.use('/',auth)
router.use('/banner',banner)
router.use('/product',product);

module.exports=router;