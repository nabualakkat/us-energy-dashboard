const mongoose = require('mongoose');

const OutageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  period: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
  },
  unit: {
    type: String,
    required: true,
  },
});

module.exports = Outage = mongoose.model('outage', OutageSchema);
