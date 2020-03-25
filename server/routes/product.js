const router=require('express').Router();
const controller=require('../controllers/ProductController');

router.get('/',controller.index);
router.get('/:id',controller.findById);

module.exports=router;