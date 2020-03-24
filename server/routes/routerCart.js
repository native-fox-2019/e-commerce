const router = require('express').Router()
const Controller = require('../controllers/cart')

router.post('/add', Controller.add)
router.delete('/delete', Controller.delete)