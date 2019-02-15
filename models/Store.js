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
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Author is required'
  }
});

//Define Indexes
storeSchema.index({
  name: 'text',
  description: 'text'
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

storeSchema.statics.getTagList = function() {
  return this.aggregate([{
    $unwind: '$tags'
  },
  { $group: {
      _id: '$tags',
      count: {
         $sum: 1
       }
    }
  },
  {
    $sort: {
      count: -1
    }
  }]);
}

module.exports = mongoose.model('Store', storeSchema);