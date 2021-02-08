const express = require('express');
const config = require('config');
const axios = require('axios');
const moment = require('moment');

const router = express.Router();
const baseURI = config.get('eiaBaseURI');
const Outage = require('../../models/Outage');

router.post('/', async (req, res) => {
  try {
    await Outage.deleteMany({});
    const outage = await axios.get(
      `${baseURI}&series_id=NUC_STATUS.OUT_PCT.US.D&num=14`
    );
    let outageData = [];
    outage.data.series[0].data.map((d) => {
      outageData = [
        ...outageData,
        {
          name: outage.data.series[0].name,
          period: moment(d[0]).format('YYYY-MM-DD'),
          value: d[1],
          unit: outage.data.series[0].units,
        },
      ];
    });
    // res.send(outageData);
    await Outage.collection.insertMany(outageData);
    res.send(moment().format('MMDDYYYY'));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Outage.find();
    res.json(data);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
