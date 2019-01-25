const passport = require('passport');

module.exports = auth = {
  login: passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid Credentials',
    successRedirect: '/',
    successFlash: 'Successfully logged in'
  }),
  logout: (req, res) => {
    req.logout();
    req.flash('success', 'You have been successfully logged out');

    res.redirect('/')
  },
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()){
      next();
      return;
    }
    req.flash('error', 'You must be logged in to access this');
    res.redirect('/login');
  }
}