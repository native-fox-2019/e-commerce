const router = require(`express`).Router()
const { admin } = require(`../controllers`)

router.post(`/register`, admin.register)

module.exports = router