const express = require('express');
const config = require('config');
const axios = require('axios');
const moment = require('moment');

const router = express.Router();
const baseURI = config.get('eiaBaseURI');
const NetGeneration = require('../../models/NetGeneration');

router.post('/', async (req, res) => {
  try {
    await NetGeneration.deleteMany({});
    const netGen = await axios.get(
      `${baseURI}&series_id=EBA.US48-ALL.NG.H&num=168`
    );
    let netGenerationData = [];
    netGen.data.series[0].data.map((d) => {
      netGenerationData = [
        ...netGenerationData,
        {
          name: netGen.data.series[0].name,
          period: moment(d[0]).format('YYYYMMDDHH'),
          value: d[1],
          unit: netGen.data.series[0].units,
        },
      ];
    });
    await NetGeneration.collection.insertMany(netGenerationData);
    res.send(moment().format('HH:mm'));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await NetGeneration.find();
    res.json(data);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
