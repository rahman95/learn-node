module.exports = user = {
  loginForm: async (req, res) => {
    res.render("auth/login", { title: "Login" });
  }
};