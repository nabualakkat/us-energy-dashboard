const mongoose = require('mongoose')

const ConsumptionBySectorSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true,
  },
  data: {
    commercialSector: {
      type: Number
    },
    industrialSector: {
      type: Number
    },
    residentialSector: {
      type: Number
    },
    transportationSector: {
      type: Number
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = ConsumptionBySector = mongoose.model('consumptionBySector', ConsumptionBySectorSchema)