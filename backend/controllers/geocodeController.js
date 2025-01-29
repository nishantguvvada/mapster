const axios = require('axios');
const { AppError } = require('../middleware/error');

const geocodeAddress = async (req, res, next) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return next(new AppError('Please provide an address', 400));
    }

    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'geocodejson',
        addressdetails: 1,
        polygon_kml: 1
      }
    });

    if (!response.data.features.length) {
      return next(new AppError('No results found for this address', 404));
    }

    const { properties, geometry } = response.data.features[0];
    
    const formattedResponse = {
      formattedAddress: properties.geocoding.label,
      coordinates: {
        lat: geometry.coordinates[1],
        lng: geometry.coordinates[0]
      },
      addressComponents: {
        houseNumber: properties.geocoding.housenumber,
        street: properties.geocoding.street,
        city: properties.geocoding.city,
        postcode: properties.geocoding.postcode,
        country: properties.geocoding.country
      }
    };

    res.status(200).json({
      status: 'success',
      data: formattedResponse
    });

  } catch (err) {
    next(new AppError(`Geocoding failed: ${err.message}`, 500));
  }
};

module.exports = { geocodeAddress }