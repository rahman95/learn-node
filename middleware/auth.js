module.exports = auth = {
  validateRegister: async (req, res, next) => {
    req.sanitizeBody("name");
    req.checkBody('name', 'Name field cannot be blank').notEmpty();
    req.checkBody("email", "Email field is not valid").isEmail();
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false,
    })
    req.checkBody("password", "Password field cannot be blank").notEmpty();
    req.checkBody("password-confirm", "Confirm password field cannot be blank").notEmpty();
    req.checkBody("password-confirm", "Password fields do not match").equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors.map(err => err.msg));
      res.render('auth/register', {title: 'Register', body: req.body, flashes: req.flash() } )
    }
  }
};
