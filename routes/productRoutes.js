const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isauthenticated = require("../middleware/authenticate");

// CREATE product
router.post("/", isauthenticated, async (req, res, next) => {
  try {
    await productController.createProduct(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to create product";
    next(error);
  }
});

// GET all products
router.get("/", async (req, res, next) => {
  try {
    await productController.getProducts(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch products";
    next(error);
  }
});

// GET single product by ID
router.get("/:id", async (req, res, next) => {
  try {
    await productController.getProductById(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch product";
    next(error);
  }
});

// UPDATE product
router.put("/:id", isauthenticated, async (req, res, next) => {
  try {
    await productController.updateProduct(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to update product";
    next(error);
  }
});

// DELETE product
router.delete("/:id", isauthenticated, async (req, res, next) => {
  try {
    await productController.deleteProduct(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to delete product";
    next(error);
  }
});

module.exports = router;
