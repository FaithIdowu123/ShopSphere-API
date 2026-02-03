const express = require('express');
const routes = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

// Mount product routes
routes.use('/products', productRoutes);

// Mount user routes
routes.use('/users', userRoutes);

module.exports = routes;
