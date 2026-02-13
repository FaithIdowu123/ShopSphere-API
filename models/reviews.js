const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: [true, "Product reference is required"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"]
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true
    }
  },
  { timestamps: true }
);

// Prevent a user from reviewing the same product more than once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Reviews", reviewSchema, "Reviews");