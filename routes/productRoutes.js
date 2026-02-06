const routes = require('express').Router();
const productController = require('../controllers/productController');

routes.get('/', (req, res) => {
  res.send('Product routes placeholder');
});

routes.delete('/:id', async (req, res) => {
  try {
    productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;