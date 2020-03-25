const router = require(`express`).Router()
const { cart } = require(`../controllers`)
const author = require(`../middleware/authorize cart`)

router.get(`/`, cart.read)
router.post(`/`, cart.add)

router.use(`/:id`, author)

router.put(`/:id`, cart.update)
router.delete(`/:id`, cart.remove)
router.post(`/:id`, cart.checkout)

module.exports = router