const mongoose = require('mongoose')

const ProductionBySourceSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: true,
  },
  data: {
    coal: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    geothermal: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    hydroelectric: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    naturalGas: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    nuclear: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    solar: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
    wind: {
      production: {
        type: Number
      },
      consumption: {
        type: Number
      }
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = ProductionBySource = mongoose.model('productionBySource', ProductionBySourceSchema)