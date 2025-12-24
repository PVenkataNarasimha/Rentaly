const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

const connectDB = async () => {
  await client.connect();
  console.log('✅ Connected to MongoDB');
};

module.exports = connectDB;
module.exports.client = client;
