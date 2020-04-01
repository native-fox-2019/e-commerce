"use strict";
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/history");
const authentication = require("../middlewares/authentication");
const authorizationNonAdmin = require("../middlewares/authorizationNonAdmin");
// const authorizationOwner = require('../middlewares/authorizationOwner')

router.use(authentication);
router.use(authorizationNonAdmin);
router.get("/", Controller.findAll);

module.exports = router;