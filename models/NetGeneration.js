const mongoose = require('mongoose');

const NetGenerationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  period: {
    type: String,
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

module.exports = NetGeneration = mongoose.model(
  'netgeneration',
  NetGenerationSchema
);
