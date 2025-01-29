const express = require('express');
const { geocodeAddress } = require('../controllers/geocodeController');
const { protect } = require('../middleware/auth');

const router = express.Router(); 

router.use(protect);

router.get('/', geocodeAddress);

module.exports = router;