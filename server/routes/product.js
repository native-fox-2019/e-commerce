const routes = require("express").Router();
const Controller = require("../controllers/product");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");
const upload = require("../helpers/cloud");

routes.get("/", Controller.get);
routes.get("/:id", Controller.findOne);
routes.put(
  "/:id",
  authentication,
  authorization,
  upload.single("file"),
  Controller.put
);
routes.post(
  "/",
  authentication,
  authorization,
  upload.single("file"),
  Controller.create
);
routes.delete("/:id", authentication, authorization, Controller.delete);

module.exports = routes;
