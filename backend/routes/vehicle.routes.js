const express = require('express');
const router = express.Router();
const { getVehicles } = require('../controllers/vehicle.controller');

router.get('/', getVehicles);
module.exports = router;
