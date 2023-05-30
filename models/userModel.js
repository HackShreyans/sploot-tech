const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  age: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
