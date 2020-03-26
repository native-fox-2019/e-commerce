const router = require('express').Router();
const authentication = require('../Middlewares/authentication');
const TransactionController = require('../Controllers/TransactionController');

router.post('/', authentication, TransactionController.addTransaction);
router.post('/all', authentication, TransactionController.addBulkTransactions);

module.exports = router