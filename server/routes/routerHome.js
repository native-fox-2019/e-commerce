const router = require('express').Router()
const Controller = require('../controllers/home')

router.post('/login', Controller.login)
router.post('/register', Controller.register)