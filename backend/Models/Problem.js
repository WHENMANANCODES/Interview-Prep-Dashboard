const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  // NEW: Yeh field har problem ko ek specific user ke account se bandh degi!
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Tumhare UserModel ka jo bhi mongoose model name hai (User ya UserModel)
  },
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