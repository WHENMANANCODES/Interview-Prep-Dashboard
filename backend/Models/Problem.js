const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  note: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);