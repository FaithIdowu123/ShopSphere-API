const express = require('express');
const routes = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');
const authRoutes = require('./authRoutes');

routes.use('/auth', authRoutes); 

routes.use('/products', productRoutes);

routes.use('/users', userRoutes);

routes.use('/orders', orderRoutes);

routes.use('/reviews', reviewRoutes);

module.exports = routes;
