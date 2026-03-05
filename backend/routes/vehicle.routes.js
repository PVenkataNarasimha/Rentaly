const express = require('express');
const Vehicle = require('../models/vehicle');

const router = express.Router();

router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

module.exports = router;
