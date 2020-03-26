const router=require('express').Router();
const controller=require('../controllers/BannerController');

router.get('/',controller.index);

module.exports=router;