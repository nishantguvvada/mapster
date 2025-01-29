const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
    enum: ['Point']
  },
  coordinates: [Number]
});

const placeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    index: '2dsphere'
  },
  googlePlaceId: String,
  review: String,
  photos: [String],
  type: {
    type: String,
    enum: ['hotel', 'restaurant']
  }
});

const citySchema = new mongoose.Schema({
  name: String,
  location: pointSchema,
  hotels: [placeSchema],
  restaurants: [placeSchema]
});

const mapSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cities: [citySchema],
  sharedToken: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Map', mapSchema);