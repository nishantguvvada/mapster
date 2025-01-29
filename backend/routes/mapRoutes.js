const express = require('express');
const { createMap, getMap, getAllMaps, updateMap, deleteMap, addCity, addPlace } = require('../controllers/mapController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router.route('/')
  .post(createMap)
  .get(getAllMaps);

router.route('/:id')
  .get(getMap)
  .patch(updateMap)
  .delete(deleteMap);

router.post('/:mapId/cities', addCity);
router.post('/:mapId/cities/:cityId/places', addPlace);

module.exports = router;