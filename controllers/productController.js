const Product = require('../models/products'); // match the model file name and exported name

// CREATE Product
exports.createProduct = async (req, res, next) => {
  try {
    // Explicitly construct the product object from req.body
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      rating: req.body.rating || 0 // default to 0 if not provided
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

// GET All Products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// GET Single Product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err); // only REAL errors go here
  }
};

// UPDATE Product
exports.updateProduct = async (req, res, next) => {
  try {
    // Explicitly build the update object
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      rating: req.body.rating
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
