const mongoose = require('mongoose');

const ConsumptionBySectorSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true,
  },
  data: [
    {
      sector: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    {
      sector: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    {
      sector: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    {
      sector: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ConsumptionBySector = mongoose.model(
  'consumptionBySector',
  ConsumptionBySectorSchema
);
