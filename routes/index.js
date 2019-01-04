const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

router.get("/", controllers.home.index);
router.get("/add", controllers.store.add);

module.exports = router;
