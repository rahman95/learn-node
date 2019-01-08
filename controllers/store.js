const mongoose = require('mongoose');
const Store = mongoose.model('Store');

module.exports = store = {
  add: (req, res) => {
    res.render("editStore", {
      title: "Add Store"
    });
  },
  create: async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Succuessfully added ${store.name}, would you like to leave a review?`);
    res.redirect(`store/${store.slug}`);
  }
};