const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Define model
const User = mongoose.model('User', userSchema);

module.exports = User;
