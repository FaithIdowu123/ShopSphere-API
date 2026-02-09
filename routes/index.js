const express = require('express');
const routes = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Mount product routes
routes.use('/products', productRoutes);

// Mount user routes
routes.use('/users', userRoutes);

routes.use('/auth', authRoutes); 

module.exports = routes;
