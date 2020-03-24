const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.use(authentication);



module.exports = router;