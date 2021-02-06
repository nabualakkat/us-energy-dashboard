const mongoose = require('mongoose');

const ProductionBySourceSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true,
  },
  data: [
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
    {
      source: {
        type: String,
      },
      production: {
        type: Number,
      },
      consumption: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ProductionBySource = mongoose.model(
  'productionBySource',
  ProductionBySourceSchema
);
