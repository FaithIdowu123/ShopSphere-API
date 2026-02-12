const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const {
  validateOrderCreate,
  validateOrderUpdate
} = require('../middleware/validate');

/* ===========================
   ORDER ROUTES
=========================== */

// CREATE ORDER
router.post('/', validateOrderCreate, orderController.createOrder);

// GET ALL ORDERS
router.get('/', orderController.getOrders);

// GET ORDER BY ID
router.get('/:id', orderController.getOrderById);

// UPDATE ORDER
router.put('/:id', validateOrderUpdate, orderController.updateOrder);

// DELETE ORDER
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
