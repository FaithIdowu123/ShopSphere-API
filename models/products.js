const db = require('../config/db');
const { ObjectId } = require('mongodb');

const productModels = {};

productModels.deleteProduct = async (productId) => {
  const dbClient = await db.getDB();
  const result = await dbClient.collection('Products').deleteOne({ _id: ObjectId(productId) });
  return result;
};

module.exports = productModels;