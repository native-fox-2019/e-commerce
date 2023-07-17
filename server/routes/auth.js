const router=require('express').Router();
const controller=require('../controllers/AuthController');
const authenticated=require('../middleware/authenticated')

router.get('/', controller.index);
router.get('/check-connection', controller.checkConnection)
router.post('/login',controller.login);
router.post('/register',controller.register)
router.put('/profile',authenticated,controller.profile)

module.exports=router;