const db = require('../config/db');
const { ObjectId } = require('mongodb');

const userModels = {};

userModels.createUser = async (userData) => {
  const dbClient = await db.getDB();
  const result = await dbClient.collection('Users').insertOne(userData);
  return result.ops[0];
};

userModels.deleteUser = async (userId) => {
  const dbClient = await db.getDB();
  const result = await dbClient.collection('Users').deleteOne({ _id: ObjectId(userId) });
  return result;
};

module.exports = userModels;