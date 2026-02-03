const mongoose = require('mongoose');
require('dotenv').config();

var database;

const connectDB = async () => {
  try {
    database = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const getDB = () => { 
    if (!database) {
        throw new Error('Database not connected.');
    }
    return database;
};

module.exports = { connectDB, getDB };