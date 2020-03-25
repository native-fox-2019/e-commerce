const router = require(`express`).Router();

const admin = require(`./adminRoutes`);
const user = require(`./userRoutes`);
const product = require(`./productRoutes`);
const cart = require(`./cartRoutes`);
const authen = require(`../middleware/authenticate`);

router.get(`/`, (req, res) => {
  res.send(`home`);
});

router.use(`/admins`, admin);
router.use(`/users`, user);

router.use(authen);

router.use(`/products`, product);

router.use(`/carts`, cart)

module.exports = router;
