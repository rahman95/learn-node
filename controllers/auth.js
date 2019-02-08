const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mailer = require('../handlers/mailer');

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
  },
  forgotPassword: async (req, res) => {
    //Check for User
    const user = await User.findOne({ email: req.body.email });
    if(! user){
      //Even if no user, show success for security reasons as can be used to work out what accounts exist in db
      req.flash('success', 'A password reset link has been mailed to you')
      return res.redirect('/login');
    }

    //Set reset token and token expiry
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //validity set to 1hr from now
    await user.save();

    //Send reset token
    const resetUrl = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`
    await mailer.send({
      user,
      subject: 'Password Reset',
      filename: 'password-reset',
      resetUrl
    });

    req.flash('success', 'A password reset link has been mailed to you')
    return res.redirect('/login');
  },
  resetPassword: (req, res) => {
    res.render('auth/reset', { title: 'Reset Password'});
  },
  updatePassword: async (req, res) => {
    const user = await User.findOne({ resetPasswordToken: req.params.token });
    const setPassword = promisify(user.setPassword, user)
    await setPassword(req.body.password);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    await req.login(updatedUser);

    req.flash('success', 'Your Password has been updated')
    return res.redirect('/');
  }
}