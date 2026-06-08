const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  date: { type: Date, required: true },
 note: {
  type: String,
  default: ""
},
  topic: { type: String },
  sheetProblemId: { type: String },  // NEW
  fromSheet: { type: String },       // NEW
}, { timestamps: true });

module.exports = mongoose.model('Problem', problemSchema);  