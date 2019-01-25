const mongoose = require('mongoose');
const User = mongoose.model("User");
const promisify = require('es6-promisify');

module.exports = user = {
  registerForm: async (req, res) => {
    res.render("auth/register", { title: "Register" });
  },

  register: async (req, res, next) => {
    const user = new User({
      email: req.body.email,
      name: req.body.name
    });
    const register = promisify(User.register, User)
    await register(user, req.body.password);

    next();
  },

  loginForm: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  },

  login: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  }
};