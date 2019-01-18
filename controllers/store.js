const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isnt allowed'}, false);
    }
  }
}

module.exports = store = {
  index: async (req, res) => {
    const stores = await Store.find();

    res.render("stores", { title: "Stores", stores });
  },
  add: (req, res) => {
    res.render("editStore", {
      title: "Add Store"
    });
  },
  upload: multer(multerOptions).single('photo'),
  resize: async (req, res, next) => {
    if(!req.file) return next();
    const extension = req.file.mimetype.split('/')[1];
    const filename = `${uuid.v4()}.${extension}`;
    req.body.photo = filename;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${filename}`);
    next();
  },
  create: async (req, res) => {
    const store = await new Store(req.body).save();
    req.flash(
      "success",
      `Succuessfully added ${store.name}, would you like to leave a review?`
    );
    res.redirect(`store/${store.slug}`);
  },
  edit: async (req, res) => {
    const store = await Store.findById(req.params.id);

    res.render("editStore", {
      title: `Edit ${store.name}`,
      store
    });
  },
  update: async (req, res) => {
    req.body.location.type = 'Point';

    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec();

    req.flash("success", `Succuessfully updated ${store.name}, <a href="stores/${store.slug}">View Store →</a>`);
    res.redirect(`/stores/${store._id}/edit`);
  }
};