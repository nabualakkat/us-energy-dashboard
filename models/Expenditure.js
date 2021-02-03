const mongoose = require('mongoose')

const ExpenditureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  period: {
    type: Date,
    required: true
  },
  value: {
    type: Number
  }
})

module.exports = Expenditure = mongoose.model('expenditure', ExpenditureSchema)