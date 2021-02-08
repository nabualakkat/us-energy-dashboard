const mongoose = require('mongoose');

const RegionalGenerationSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  value: {
    type: Array,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

module.exports = RegionalGeneration = mongoose.model(
  'regionalgeneration',
  RegionalGenerationSchema
);
