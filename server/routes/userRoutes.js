const router = require(`express`).Router()
const { admin } = require(`../controllers`)
const authen = require(`../middleware/authenticate`)

router.post(`/register`, admin.userRegister)
router.post(`/login`, admin.login)

router.post(`/add2wallet`, authen, admin.addWallet)

module.exports = router