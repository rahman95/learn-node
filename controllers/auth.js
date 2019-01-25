const passport = require('passport');

module.exports = auth = {
  login: passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid Credentials',
    successRedirect: '/',
    successFlash: 'Successfully logged in'
  })
}