const User = require('../models/users'); // match exact file name

// GET All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-authId');
    res.status(200).json(users);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// GET Single User
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-authId');

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(user);
  } catch (err) {
    err.status = 400; // invalid ID or DB error
    next(err);
  }
};

// ADD User
exports.addUser = async (req, res, next) => {
  try {
    const userData = {
      displayName: req.body.firstName + ' ' + req.body.lastName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: 'customer',
      oauthProvider: req.body.oauthProvider,
      authId: '',
    };

    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    err.status = 500;
    next(err);
  }
};

// DELETE User
exports.deleteUser = async (req, res, next) => {
  try {
    const results = await User.deleteOne({ _id: req.params.id });

    if (results.deletedCount === 0) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

// UPDATE User
exports.updateUser = async (req, res, next) => {
  try {
    const userData = {
      displayName: req.body.firstName + ' ' + req.body.lastName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: 'customer',
      oauthProvider: req.body.oauthProvider,
      authId: '',
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      userData,
      { new: true, runValidators: true }
    ).select('-authId');

    if (!updatedUser) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
