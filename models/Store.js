const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Store Name is required"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "Co-oridinates are required"
      }
    ],
    address: {
      type: String,
      required: "Address is required"
    }
  },
  photo: String,
  created: {
    type: Date,
    default: Date.now
  }
});

storeSchema.pre('save', async function(next) {
  if(!this.isModified('name')){
    return next();
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if(storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
})

module.exports = mongoose.model('Store', storeSchema);