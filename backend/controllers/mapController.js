const Map = require('../models/Map');
const crypto = require('crypto');
const { AppError } = require('../middleware/error');

const createMap = async (req, res, next) => {
  try {
    const map = await Map.create({ 
      owner: req.user._id,
      sharedToken: crypto.randomBytes(16).toString('hex')
    });
    
    res.status(201).json({
      status: 'success',
      data: map
    });
  } catch (err) {
    next(err);
  }
};

const getMap = async (req, res, next) => {
  try {
    const map = await Map.findOne({
      _id: req.params.id,
      $or: [
        { owner: req.user._id },
        { sharedToken: req.query.token }
      ]
    }).populate('owner');

    if (!map) return next(new AppError('Map not found', 404));

    res.status(200).json({
      status: 'success',
      data: map
    });
  } catch (err) {
    next(err);
  }
};

const getAllMaps = async (req, res, next) => {
  try {
    // Get all maps owned by the user
    const maps = await Map.find({ owner: req.user._id })
      .select('-sharedToken')
      .populate('owner', 'username email');

    res.status(200).json({
      status: 'success',
      results: maps.length,
      data: maps
    });
  } catch (err) {
    next(err);
  }
};

const updateMap = async (req, res, next) => {
  try {
    const map = await Map.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!map) {
      return next(new AppError('Map not found or unauthorized', 404));
    }

    // Prevent changing owner or sharedToken through this endpoint
    const filteredBody = req.body;
    delete filteredBody.owner;
    delete filteredBody.sharedToken;

    const updatedMap = await Map.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedMap
    });
  } catch (err) {
    next(err);
  }
};

const deleteMap = async (req, res, next) => {
  try {
    const map = await Map.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!map) {
      return next(new AppError('Map not found or unauthorized', 404));
    }

    // Remove map reference from users' sharedMaps
    await User.updateMany(
      { sharedMaps: req.params.id },
      { $pull: { sharedMaps: req.params.id } }
    );

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

const addCity = async (req, res, next) => {
  try {
    const map = await Map.findOne({
      _id: req.params.mapId,
      owner: req.user._id
    });

    if (!map) {
      return next(new AppError('Map not found or unauthorized', 404));
    }

    const newCity = {
      name: req.body.name,
      location: {
        type: 'Point',
        coordinates: req.body.coordinates
      }
    };

    map.cities.push(newCity);
    await map.save();

    res.status(201).json({
      status: 'success',
      data: map
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new AppError(err.message, 400));
    }
    next(err);
  }
};

const addPlace = async (req, res, next) => {
  try {
    const map = await Map.findOne({
      _id: req.params.mapId,
      owner: req.user._id
    });

    if (!map) {
      return next(new AppError('Map not found or unauthorized', 404));
    }

    const city = map.cities.id(req.params.cityId);
    if (!city) {
      return next(new AppError('City not found in this map', 404));
    }

    const { type, name, coordinates, googlePlaceId, review, photos } = req.body;
    
    if (!['hotel', 'restaurant'].includes(type)) {
      return next(new AppError('Invalid place type. Use "hotel" or "restaurant"', 400));
    }

    const newPlace = {
      name,
      location: {
        type: 'Point',
        coordinates
      },
      googlePlaceId,
      review,
      photos,
      type
    };

    if (type === 'hotel') {
      city.hotels.push(newPlace);
    } else {
      city.restaurants.push(newPlace);
    }

    await map.save();

    res.status(201).json({
      status: 'success',
      data: map
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new AppError(err.message, 400));
    }
    next(err);
  }
};

module.exports = { createMap, getMap, getAllMaps, updateMap, deleteMap, addCity, addPlace }