const userModels = require('../models/users');

const User =  {};


User.addUser = async (req, res) => {
  const userData = {displayName: req.body.firstName + ' ' + req.body.lastName, 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: "customer",
    oauthprovider: req.body.oauthprovider,
    oauthid: "",
    createdAt: new Date()
  }

  const newUser = await userModels.createUser(userData);
  res.status(201).json(newUser);
};

User.deleteUser = async (req, res) => {
  const userId = req.params.id;
  const results = await userModels.deleteUser(userId);
  if (results.deletedCount === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
    res.json({ message: 'User deleted successfully' });
};

module.exports = User;