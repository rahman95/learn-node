const express = require('express');
const router = express.Router();

const middlewares = require('../middleware')
const controllers = require("../controllers");

const { catchErrors } = require('../handlers/errorHandlers')

//Stores
router.get("/", catchErrors(controllers.store.index));
router.get("/stores", catchErrors(controllers.store.index));
router.get('/stores/:slug', catchErrors(controllers.store.show));
router.get('/stores/:id/edit', catchErrors(controllers.store.edit))

router.get("/add",
  controllers.auth.isLoggedIn,
  controllers.store.add
);
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

//Tags
router.get("/tags", controllers.tag.get);
router.get("/tags/:tag", controllers.tag.get);

//Map
router.get("/map", controllers.map.index);

//Auth
router.get("/register", controllers.user.registerForm);
router.post("/register",
  middlewares.auth.validateRegister,
  controllers.user.register,
  controllers.auth.login
);
router.get('/login', controllers.user.loginForm);
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.get('/account',
  controllers.auth.isLoggedIn,
  controllers.user.account
);
router.post("/account", catchErrors(controllers.user.update));
router.post("/account/forgot", catchErrors(controllers.auth.forgotPassword))
router.get("/account/reset/:token",
  middlewares.auth.checkResetToken,
  catchErrors(controllers.auth.resetPassword)
)
router.post("/account/reset/:token",
  middlewares.auth.checkResetToken,
  middlewares.auth.confirmedPasswords,
  catchErrors(controllers.auth.updatePassword)
)

//API
router.get('/api/search', catchErrors(controllers.store.search));
router.get('/api/stores/near', catchErrors(controllers.store.findNear));


module.exports = router;
