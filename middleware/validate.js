const validator = require('../helpers/validate');

const sendValidationError = (res, err) => {
  return res.status(412).send({
    success: false,
    message: 'Validation failed',
    data: err
  });
};

const runValidation = (rules) => (req, res, next) => {
  validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      return sendValidationError(res, err);
    }
    next();
  });
};

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

module.exports = {
  validateProductCreate,
  validateProductUpdate,
  validateUserCreate,
  validateUserUpdate
};
