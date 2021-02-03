const mongoose = require('mongoose')

const EmissionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  period: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
  },
  unit: {
    type: String,
    required: true
  }
})

module.exports = Emissions = mongoose.model('emissions', EmissionsSchema)