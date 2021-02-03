const express = require('express')
const config = require('config')
const ConsumptionBySector = require('../../models/ConsumptionBySector')
const ProductionBySource = require('../../models/ProductionBySource')
const Emissions = require('../../models/Emissions')
const Expenditure = require('../../models/Expenditure')

const router = express.Router()
const baseURI = config.get('eiaBaseURI')

router.get('/consumption', async (req, res) => {
  try {
    const consumption = await ConsumptionBySector.find()
    res.json(consumption)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

router.get('/production', async (req, res) => {
  try {
    const production = await ProductionBySource.find()
    res.json(production)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

router.get('/emissions', async (req, res) => {
  try {
    const emissions = await Emissions.find()
    res.json(emissions)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

router.get('/expenditure', async (req, res) => {
  try {
    const expenditure = await Expenditure.find()
    res.json(expenditure)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})


module.exports = router