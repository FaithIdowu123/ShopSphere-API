const productModel = require('../models/products');

const Product =  {};

Product.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const results = await productModel.deleteProduct(productId);
    if (results.deletedCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
};

module.exports = Product;