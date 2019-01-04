const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

// Do work here
router.get("/", controllers.homeController.index);

module.exports = router;
