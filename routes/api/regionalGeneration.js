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
    states: ['US-CA'],
    series: '&series_id=EBA.CAL-ALL.NG.H&num=24',
  },
  {
    region: 'Carolinas',
    states: ['US-NC', 'US-SC'],
    series: '&series_id=EBA.CAR-ALL.NG.H&num=24',
  },
  {
    region: 'Central',
    states: [
      'US-ND',
      'US-SD',
      'US-NE',
      'US-KS',
      'US-MN',
      'US-IA',
      'US-MO',
      'US-WI',
      'US-IL',
      'US-IN',
      'US-OH',
      'US-OK',
      'US-KY',
    ],
    series: '&series_id=EBA.CENT-ALL.NG.H&num=24',
  },
  {
    region: 'Florida',
    states: ['US-FL'],
    series: '&series_id=EBA.FLA-ALL.NG.H&num=24',
  },
  {
    region: 'Mid-Atlantic',
    states: ['US-PA', 'US-NJ', 'US-WV', 'US-VA', 'US-MD', 'US-DE'],
    series: '&series_id=EBA.MIDA-ALL.NG.H&num=24',
  },
  {
    region: 'New England',
    states: ['US-VT', 'US-NH', 'US-CT', 'US-MA', 'US-RI', 'US-ME'],
    series: '&series_id=EBA.NE-ALL.NG.H&num=24',
  },
  {
    region: 'New York',
    states: ['US-NY'],
    series: '&series_id=EBA.NY-ALL.NG.H&num=24',
  },
  {
    region: 'Northwest',
    states: ['US-WY', 'US-MT', 'US-ID', 'US-WA', 'US-OR'],
    series: '&series_id=EBA.NW-ALL.NG.H&num=24',
  },
  {
    region: 'Southeast',
    states: ['US-GA', 'US-AR', 'US-LA', 'US-MS', 'US-AL'],
    series: '&series_id=EBA.SE-ALL.NG.H&num=24',
  },
  {
    region: 'Southwest',
    states: ['US-CO', 'US-NM', 'US-AZ', 'US-UT', 'US-NV'],
    series: '&series_id=EBA.SW-ALL.NG.H&num=24',
  },
  {
    region: 'Tennessee',
    states: ['US-TN'],
    series: '&series_id=EBA.TEN-ALL.NG.H&num=24',
  },
  {
    region: 'Texas',
    states: ['US-TX'],
    series: '&series_id=EBA.TEX-ALL.NG.H&num=24',
  },
];

const fetchData = async (item) => {
  const rawSeriesData = await axios.get(`${baseURI}${item.series}`);
  const seriesData = {
    ...rawSeriesData.data.series[0],
    region: item.region,
    states: item.states,
  };
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
      states: d.states,
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
