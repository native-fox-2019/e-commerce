const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', ProductController.getAll);
router.patch('/:id', ProductController.editStock);

router.use(authorization);
router.post('/', ProductController.createData);
router.put('/:id', ProductController.editData);
router.delete('/:id', ProductController.deleteData);

module.exports = router;