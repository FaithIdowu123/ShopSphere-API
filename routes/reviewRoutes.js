const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// CREATE review
router.post("/", async (req, res, next) => {
  try {
    await reviewController.createReview(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to create review";
    next(error);
  }
});

// GET all reviews
router.get("/", async (req, res, next) => {
  try {
    await reviewController.getReviews(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch reviews";
    next(error);
  }
});

// GET single review by ID
router.get("/:id", async (req, res, next) => {
  try {
    await reviewController.getReviewById(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to fetch review";
    next(error);
  }
});

// UPDATE review
router.put("/:id", async (req, res, next) => {
  try {
    await reviewController.updateReview(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to update review";
    next(error);
  }
});

// DELETE review
router.delete("/:id", async (req, res, next) => {
  try {
    await reviewController.deleteReview(req, res, next);
  } catch (error) {
    if (!error.status) error.status = 500;
    if (error.status === 500) error.message = "Failed to delete review";
    next(error);
  }
});

module.exports = router;