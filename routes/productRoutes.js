const routes = require('express').Router();

const contactsController = require('../controllers/contacts');

routes.get('/', productController.getAllProducts);

routes.get('/:id', productController.getSingleProduct);

routes.put('/:id', productController.updateProduct);


routes.get('/', (req, res) => {
  res.send('Product routes placeholder');
});

module.exports = routes;