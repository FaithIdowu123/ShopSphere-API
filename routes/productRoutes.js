const routes = require('express').Router();
const Joi = require('joi');

const productController = require('../controllers/productController');

// Joi validation schema for product updates
const productUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  description: Joi.string().min(1).max(2000),
  price: Joi.number().positive(),
  stock: Joi.number().integer().min(0),
  category: Joi.string().min(1).max(100),
  rating: Joi.number().min(0).max(5)
}).min(1);

// Validation middleware
const validateProductUpdate = (req, res, next) => {
  const { error } = productUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      details: error.details.map(e => e.message)
    });
  }
  next();
};

routes.get('/', productController.getAllProducts);

routes.get('/:id', productController.getSingleProduct);

routes.put('/:id', validateProductUpdate, productController.updateProduct);


routes.get('/', (req, res) => {
  res.send('Product routes placeholder');
});

module.exports = routes;