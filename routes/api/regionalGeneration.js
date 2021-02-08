const express = require('express');
const config = require('config');
const axios = require('axios');
const moment = require('moment');

const router = express.Router();
const baseURI = config.get('eiaBaseURI');
const RegionalGeneration = require('../../models/RegionalGeneration');

const seriesIds = [
  {
    region: 'California',
    series: '&series_id=EBA.CAL-ALL.NG.H&num=24',
  },
  {
    region: 'Carolinas',
    series: '&series_id=EBA.CAR-ALL.NG.H&num=24',
  },
  {
    region: 'Central',
    series: '&series_id=EBA.CENT-ALL.NG.H&num=24',
  },
  {
    region: 'Florida',
    series: '&series_id=EBA.FLA-ALL.NG.H&num=24',
  },
  {
    region: 'Mid-Atlantic',
    series: '&series_id=EBA.MIDA-ALL.NG.H&num=24',
  },
  {
    region: 'New England',
    series: '&series_id=EBA.NE-ALL.NG.H&num=24',
  },
  {
    region: 'New York',
    series: '&series_id=EBA.NY-ALL.NG.H&num=24',
  },
  {
    region: 'Northwest',
    series: '&series_id=EBA.NW-ALL.NG.H&num=24',
  },
  {
    region: 'Southeast',
    series: '&series_id=EBA.SE-ALL.NG.H&num=24',
  },
  {
    region: 'Southwest',
    series: '&series_id=EBA.SW-ALL.NG.H&num=24',
  },
  {
    region: 'Tennessee',
    series: '&series_id=EBA.TEN-ALL.NG.H&num=24',
  },
  {
    region: 'Texas',
    series: '&series_id=EBA.TEX-ALL.NG.H&num=24',
  },
];

const fetchData = async (item) => {
  const rawSeriesData = await axios.get(`${baseURI}${item.series}`);
  const seriesData = { ...rawSeriesData.data.series[0], region: item.region };
  return seriesData;
};

const getData = async () => {
  return Promise.all(seriesIds.map((item) => fetchData(item)));
};

router.post('/', async (req, res) => {
  try {
    await RegionalGeneration.deleteMany({});
    const data = await getData();
    const regionGenerationData = data.map((d) => ({
      region: d.region,
      value: d.data,
      unit: d.units,
    }));
    await RegionalGeneration.collection.insertMany(regionGenerationData);
    res.send(moment().format('HH:mm'));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await RegionalGeneration.find();
    res.json(data);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
