const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Article", articleSchema);
