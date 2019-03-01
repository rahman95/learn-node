const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Author is a required field'
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: 'Store is a required field'
  },
  text: {
    type: String,
    required: 'Text is a required field',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Review', reviewSchema);