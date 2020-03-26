const routes = require("express").Router();
const Controller = require("../controllers/cart");

routes.post("/", Controller.cart);
routes.get("/", Controller.show);
routes.put("/:id", Controller.edit);
routes.delete("/:id", Controller.removeProduct);
routes.delete("/", Controller.destroy);

module.exports = routes;
