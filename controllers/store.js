const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const User = mongoose.model('User');

module.exports = store = {
  index: async (req, res) => {
    const stores = await Store.find();

    res.render("stores", { title: "Stores", stores });
  },

  show: async (req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug }).populate('author');
    if (!store) return next();

    res.render("show", {
      title: store.name,
      store
    });
  },

  add: (req, res) => {
    res.render("editStore", {
      title: "Add Store"
    });
  },

  create: async (req, res) => {
    req.body.author = req.user._id;
    const store = await new Store(req.body).save();
    req.flash(
      "success",
      `Succuessfully added ${store.name}, would you like to leave a review?`
    );
    res.redirect(`/stores/${store.slug}`);
  },

  edit: async (req, res) => {
    const store = await Store.findById(req.params.id);
    if(! store.author._id.equals(req.user._id)){
      req.flash('error', 'Only the owner can edit the Store')
      res.redirect('back');
    }

    res.render("editStore", {
      title: `Edit ${store.name}`,
      store
    });
  },

  update: async (req, res) => {
    req.body.location.type = "Point";

    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec();

    req.flash(
      "success",
      `Succuessfully updated ${store.name}, <a href="stores/${
        store.slug
      }">View Store →</a>`
    );
    res.redirect(`/stores/${store._id}/edit`);
  },

  search: async (req, res) => {
    const query = req.query.q;
    const stores = await Store.find({
      $text: { $search: query }
    }, {
      score: { $meta: 'textScore' }
    }).sort({
      score: { $meta: 'textScore' }
    }).limit(5);

    res.json(stores);
  },

  findNear: async(req, res) => {
    const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates
          },
          $maxDistance: 10000 //10km
        }
      }
    };

    const stores = await Store
      .find(query, 'slug name description location photo')
      .limit(10);

    res.json(stores);
  },

  favourite: async(req, res) => {
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.findByIdAndUpdate(req.user._id, {
      [operator]: { hearts: req.params.id }
    }, {
      new:true
    });

    res.json(user.hearts);
  },

  getFavourites: async (req, res) => {
    const stores = await Store.find({ _id: { $in: req.user.hearts } });

    res.render('stores', {title: 'Your favourite stores', stores})
  }
};