const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  stipend: { type: String },
  startDate: { type: Date },
  durationWeeks: { type: Number },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);
