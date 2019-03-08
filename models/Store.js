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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

//Define Indexes
storeSchema.index({
  name: 'text',
  description: 'text',
});

storeSchema.index({
  location: '2dsphere'
})

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

storeSchema.statics.getTopStores = function () {
  return this.aggregate([
    //Find stores and populate reviews
    { $lookup: { from: 'reviews', localField: '_id', foreignField: 'store', as: 'reviews' } },
    //Filter stores with have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    //Add the average review score
    { $project: {
      photo: '$$ROOT.photo',
      name: '$$ROOT.name',
      slug: '$$ROOT.slug',
      reviews: '$$ROOT.reviews',
      averageRating: { $avg: '$reviews.rating' }
    }},
    //Sort based on rating
    { $sort: { averageRating: -1} },
    //limit to 10
    { $limit: 10}
  ])
}


storeSchema.virtual('reviews', {
    ref: 'Review', //which model to link?
    localField: '_id', //which field on the store
    foreignField: 'store' // which field on review?
});

function autoPopulate(next) {
  this.populate('reviews');
  next();
}

storeSchema.pre('find', autoPopulate)
storeSchema.pre('findOne', autoPopulate)

module.exports = mongoose.model('Store', storeSchema);