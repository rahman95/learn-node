const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

const { catchErrors } = require('../handlers/errorHandlers')

router.get("/", catchErrors(controllers.store.index));
router.get("/stores", catchErrors(controllers.store.index));
router.get('/stores/:slug', catchErrors(controllers.store.show));
router.get('/stores/:id/edit', catchErrors(controllers.store.edit))

router.get("/add", controllers.store.add);
router.post("/add",
  middlewares.photo.upload,
  catchErrors(middlewares.photo.resize),
  catchErrors(controllers.store.create)
);
router.post("/add/:id",
  middlewares.photo.upload,
  catchErrors(middlewares.photo.resize),
  catchErrors(controllers.store.update)
);

router.get("/tags", controllers.tag.get);
router.get("/tags/:tag", controllers.tag.get);

router.get("/register", controllers.user.registerForm);
router.post("/register", middlewares.auth.validateRegister);

router.get('/login', controllers.user.loginForm);
router.post("/login", controllers.user.login);

module.exports = router;
