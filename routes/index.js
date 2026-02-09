const express = require('express');
const routes = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');

routes.use('/products', productRoutes);

routes.use('/users', userRoutes);

routes.use('/orders', orderRoutes);

routes.use('/reviews', reviewRoutes);

module.exports = routes;
