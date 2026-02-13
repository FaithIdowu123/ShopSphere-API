const Product = require("../models/products");
const Review = require("../models/reviews");

module.exports = async function recalc(productId) {
  const reviews = await Review.find({ productId: productId });

  if (reviews.length === 0) {
    await Product.updateOne({ id: productId }, { rating: 0 });
    return;
  }
  

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.updateOne(
    { id: productId },
    { rating: Number(avg.toFixed(1)) }
  );
};
