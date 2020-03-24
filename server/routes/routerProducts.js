const router = require('express').Router()
const Controller = require('../controllers/products')

router.get('/', Controller.getAll)