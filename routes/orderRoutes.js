const express = require("express");
const router = express.Router();
const isauthenticated = require("../middleware/authenticate");
const orderController = require("../controllers/orderController");
const {
  validateOrderCreate,
  validateOrderUpdate
} = require('../middleware/validate');

/* ===========================
   ORDER ROUTES
=========================== */

// CREATE ORDER
router.post(
  '/',
  isauthenticated,
  validateOrderCreate,
  async (req, res, next) => {
    try {
      await orderController.createOrder(req, res, next);
    } catch (error) {
      if (!error.status) error.status = 500;
      if (error.status === 500) error.message = "Failed to create order";
      next(error);
    }
  }
);

// GET ALL ORDERS
router.get('/', async (req, res, next) => {
  try {
    await orderController.getOrders(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch orders";
    next(error);
  }
});

// GET ORDER BY ID
router.get('/:id', async (req, res, next) => {
  try {
    await orderController.getOrderById(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch order";
    next(error);
  }
});

// UPDATE ORDER
router.put(
  '/:id',
  isauthenticated,
  validateOrderUpdate,
  async (req, res, next) => {
    try {
      await orderController.updateOrder(req, res, next);
    } catch (error) {
      if (!error.status) error.status = 500;
      if (error.status === 500) error.message = "Failed to update order";
      next(error);
    }
  }
);

// DELETE ORDER
router.delete('/:id', isauthenticated, async (req, res, next) => {
  try {
    await orderController.deleteOrder(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to delete order";
    next(error);
  }
});

module.exports = router;
