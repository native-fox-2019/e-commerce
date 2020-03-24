const router = require('express').Router()
const Controller = require('../controllers/cart')

router.post('/add/:id', Controller.add)
router.delete('/delete/:id', Controller.delete)