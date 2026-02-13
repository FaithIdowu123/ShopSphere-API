const Product = require('../models/products'); // match the model file name and exported name
const recalculateRating = require('../utils/recalculateRating');

exports.setReviews = async (req, res, next) => {
  const products = await Product.find();
  products.forEach(product => {
    recalculateRating(product._id);
  });
};