const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

const { catchErrors } = require('../handlers/errorHandlers')

router.get("/", catchErrors(controllers.store.index));
router.get("/stores", catchErrors(controllers.store.index));
router.get("/add", controllers.store.add);
router.post("/add", catchErrors(controllers.store.create));

module.exports = router;
