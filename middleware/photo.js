const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isnt allowed' }, false);
    }
  }
}

module.exports = photo = {
  upload: multer(multerOptions).single('photo'),
  resize: async (req, res, next) => {
    if (!req.file) return next();
    const extension = req.file.mimetype.split('/')[1];
    const filename = `${uuid.v4()}.${extension}`;
    req.body.photo = filename;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${filename}`);
    next();
  },
}