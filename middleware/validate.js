const validator = require('../helpers/validate');

/**
 * Sends validation error response
 */
const sendValidationError = (res, err) => {
  return res.status(412).send({
    success: false,
    message: 'Validation failed',
    data: err
  });
};

/**
 * Runs validation rules
 */
const runValidation = (rules) => (req, res, next) => {
  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return sendValidationError(res, err);
    }
    next();
  });
};

/* ===========================
   PRODUCT VALIDATION
=========================== */

const validateProductCreate = runValidation({
  name: 'required|string',
  description: 'required|string',
  price: 'required|numeric|min:0',
  stock: 'required|integer|min:0',
  category: 'required|string',
  rating: 'numeric|between:0,5'
});

const validateProductUpdate = runValidation({
  name: 'required|string',
  description: 'required|string',
  price: 'required|numeric|min:0',
  stock: 'required|integer|min:0',
  category: 'required|string',
  rating: 'numeric|between:0,5'
});

/* ===========================
   USER VALIDATION
=========================== */

const validateUserCreate = runValidation({
  firstName: 'required|string',
  lastName: 'required|string',
  email: 'required|email',
  oauthProvider: 'required|string'
});

const validateUserUpdate = runValidation({
  firstName: 'required|string',
  lastName: 'required|string',
  email: 'required|email',
  oauthProvider: 'required|string'
});

/* ===========================
   ORDER VALIDATION (WEEK 06)
=========================== */

const validateOrderCreate = runValidation({
  userId: 'string',
  products: 'required|array',
  totalPrice: 'numeric|min:0',
  status: 'string'
});

const validateOrderUpdate = runValidation({
  userId: 'string',
  products: 'required|array',
  totalPrice: 'numeric|min:0',
  status: 'string'
});

/* ===========================
   REVIEW VALIDATION
=========================== */

const validateReviewCreate = runValidation({
  productId: 'required|string', // ObjectId as string
  userId: 'string',    // ObjectId as string
  rating: 'required|numeric|between:1,5',
  comment: 'required|string|min:1'
});

const validateReviewUpdate = runValidation({
  rating: 'numeric|between:1,5',
  comment: 'string|min:1'
});

/* ===========================
   EXPORTS
=========================== */

module.exports = {
  validateProductCreate,
  validateProductUpdate,
  validateUserCreate,
  validateUserUpdate,
  validateOrderCreate,
  validateOrderUpdate,
  validateReviewCreate,
  validateReviewUpdate
};