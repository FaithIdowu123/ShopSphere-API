const Order = require('../models/orders');

// GET All Orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// GET Single Order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// CREATE Order
exports.createOrder = async (req, res, next) => {
  try {
    const orderData = { 
      userId: req.user._id, 
      products: req.body.products, // [{ productId, itemCount }]
      totalAmount: req.body.totalAmount,
      status: req.body.status || 'pending',
      paymentMethod: req.body.paymentMethod,
      orderAddress: req.body.orderAddress,
      createdAt: Date.now()
    };

    const newOrder = await Order.create(orderData);
    const populatedOrder = await newOrder;

    res.status(201).json(populatedOrder);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// UPDATE Order
exports.updateOrder = async (req, res, next) => {
  try {
    const updatedData = {
      userId: req.user._id, 
      products: req.body.products,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      orderAddress: req.body.orderAddress,
    };

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// DELETE Order
exports.deleteOrder = async (req, res, next) => {
  try {
    const results = await Order.deleteOne({ _id: req.params.id });

    if (results.deletedCount === 0) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
