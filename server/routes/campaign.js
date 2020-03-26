const routes = require("express").Router();
const Controller = require("../controllers/campaign");
const { authorization } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");
const upload = require("../helpers/cloud");

routes.get("/", Controller.get);
routes.get("/:id", authentication, Controller.getOne);
routes.post(
  "/",
  authentication,
  authorization,
  upload.single("file"),
  Controller.create
);
routes.put(
  "/:id",
  authentication,
  authorization,
  upload.single("file"),
  Controller.update
);
routes.delete("/:id", authentication, authorization, Controller.delete);

module.exports = routes;
