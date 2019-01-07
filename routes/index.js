const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

const { catchErrors } = require('../handlers/errorHandlers')

router.get("/", controllers.home.index);
router.get("/add", controllers.store.add);
router.post("/add", catchErrors(controllers.store.create));

module.exports = router;
