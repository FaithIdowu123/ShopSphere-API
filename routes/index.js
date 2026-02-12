const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const reviewRoutes = require('./reviewRoutes');
const authRoutes = require('./authRoutes');

// ------------------- AUTH ROUTES -------------------
router.use('/auth', authRoutes);

// ------------------- PRODUCT ROUTES -------------------
router.use('/products', productRoutes);

// ------------------- USER ROUTES -------------------
router.use('/users', userRoutes);

// ------------------- ORDER ROUTES -------------------
router.use('/orders', orderRoutes);

// ------------------- REVIEW ROUTES -------------------
router.use('/reviews', reviewRoutes);

module.exports = router;
