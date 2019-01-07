const mongoose = require('mongoose');
const Store = mongoose.model('Store');

module.exports = store = {
  add: (req, res) => {
    res.render("editStore", {
      title: "Add Store"
    });
  },
  create: async (req, res) => {
    const store = new Store(req.body);
    await store.save();

    res.redirect('/');
  }
};