const { client } = require('../config/db');

const getVehicles = async (req, res) => {
  try {
    const vehicles = client.db('rentaly').collection('vehicles');
    const data = await vehicles.find().toArray();

    const mapped = data.map((v, index) => ({
      id: index + 1,
      name: v.name,
      price: v.price,
      likes: v.likes ?? 0,
      type: v.type,
      passengers: v.passengers,
      luggage: v.luggage,
      doors: v.doors,
      image: v.image,
    }));

    res.json(mapped);
  } catch {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

module.exports = { getVehicles };
