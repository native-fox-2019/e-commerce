const routes = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const user = require("./user");
const campaign = require("./campaign");
const product = require("./product");
const costumer = require("./costumer");
const cart = require("./cart");

routes.get("/", (req, res) => res.send("Welcome to e commerce"));
routes.use("/products", product);
routes.use("/campaign", campaign);
routes.use("/user", user);
routes.use("/customer", costumer);
routes.use("/cart", authentication, cart);

module.exports = routes;
