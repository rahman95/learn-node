module.exports = user = {
  registerForm: async (req, res) => {
    res.render("auth/register", { title: "Register" });
  },

  register: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  },

  loginForm: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  },

  login: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  }
};