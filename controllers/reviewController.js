const Review = require('../models/reviews');

// CREATE Review
exports.createReview = async (req, res, next) => {
  try {
    const reviewData = {
      product: req.body.product,  // Product ID
      user: req.body.user,        // User ID (optional if auth not added yet)
      rating: req.body.rating,
      comment: req.body.comment
    };

    const review = await Review.create(reviewData);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

// GET All Reviews
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name')
      .populate('user', 'name email');

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// GET Reviews by Product ID
exports.getReviewsByProduct = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name email');

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// GET Single Review
exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('product', 'name')
      .populate('user', 'name email');

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
