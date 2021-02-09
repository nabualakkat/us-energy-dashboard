const mongoose = require('mongoose');

const RegionalGenerationSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  states: {
    type: Array,
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
