const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

const { catchErrors } = require('../handlers/errorHandlers')

router.get("/", catchErrors(controllers.store.index));

router.get("/stores", catchErrors(controllers.store.index));
router.get('/stores/:id/edit', catchErrors(controllers.store.edit))

router.get("/add", controllers.store.add);
router.post("/add",
  controllers.store.upload,
  catchErrors(controllers.store.resize),
  catchErrors(controllers.store.create)
);
router.post("/add/:id",
  controllers.store.upload,
  catchErrors(controllers.store.resize),
  catchErrors(controllers.store.update)
);

module.exports = router;
