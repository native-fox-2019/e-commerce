const router = require(`express`).Router()
const { admin } = require(`../controllers`)

router.post(`/register`, admin)
router.post(`/login`, admin)

module.exports = router