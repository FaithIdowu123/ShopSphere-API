const mongodb = require('../config/db');
const ObjectID = require('mongodb').ObjectId;


//gets all products
const getAllProducts = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('Products').find();
    result.toArray().then((products) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products);
    }).catch((err) => {
      res.status(500).json({ message: 'Error retrieving products', error: err.message });
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


//gets products by id
const getSingleProduct = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    const productid = new ObjectID(req.params.id)
    const result = await mongodb.getDatabase().db().collection('Products').find({ _id: productid });
    result.toArray().then((products) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products[0]);
    }).catch((err) => {
      res.status(500).json({ message: 'Error retrieving products', error: err.message });
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

//PUT products by id
const updateProduct = async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const productid = new ObjectID(req.params.id)

    const products = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      rating: req.body.rating
    }

    const response = await mongodb.getDatabase().db().collection('Products').replaceOne({ _id: productid }, contacts);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Product not found or no changes made' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}


module.exports = {
  getSingleProduct,
  getAllProducts,
  updateProduct
};