const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    displayName: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
    oauthProvider: String,
    authId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema, 'Users');