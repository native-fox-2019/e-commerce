const router=require('express').Router();
const product=require('./routes/product');
const auth=require('./routes/auth')

router.use('/',auth)
router.use('/product',product);

module.exports=router;