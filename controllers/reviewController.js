const Review = require('../models/reviews');
const recalculateRating = require('../utils/recalculateRating');

// CREATE Review
exports.createReview = async (req, res, next) => {
  try {
    const reviewData = {
      productId: req.body.productId,  // Product ID
      userId: req.user._id,        
      rating: req.body.rating,
      comment: req.body.comment
    };

    const review = await Review.create(reviewData);

    recalculateRating(req.body.productId);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

// GET All Reviews
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// GET Reviews by Product ID
exports.getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });

    if (reviews.length == 0 || !reviews || reviews == null) {
        console.log("Heey")
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// GET Single Review
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// UPDATE Review
exports.updateReview = async (req, res, next) => {
  try {
    const updateData = {
      rating: req.body.rating,
      comment: req.body.comment
    };

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    recalculateRating(review.productId);

    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// DELETE Review
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    recalculateRating(review.productId);

    if (!review) {
      const err = new Error('Review not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};