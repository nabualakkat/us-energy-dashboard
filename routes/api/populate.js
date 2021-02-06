const express = require('express');
const config = require('config');
const axios = require('axios');
const moment = require('moment');
const ConsumptionBySector = require('../../models/ConsumptionBySector');
const ProductionBySource = require('../../models/ProductionBySource');
const Emissions = require('../../models/Emissions');
const Expenditure = require('../../models/Expenditure');

const router = express.Router();
const baseURI = config.get('eiaBaseURI');

//Post all historic data from EIA to MONGO
router.get('/', async (req, res) => {
  //TOTAL ENERGY CONSUMED BY SECTOR
  try {
    const commercialData = await axios.get(
      `${baseURI}&series_id=TOTAL.TECCBUS.M`
    );
    const commercialSector = commercialData.data.series[0];
    const industrialData = await axios.get(
      `${baseURI}&series_id=TOTAL.TEICBUS.M`
    );
    const industrialSector = industrialData.data.series[0];
    const residentialData = await axios.get(
      `${baseURI}&series_id=TOTAL.TERCBUS.M`
    );
    const residentialSector = residentialData.data.series[0];
    const transportationData = await axios.get(
      `${baseURI}&series_id=TOTAL.TEACBUS.M`
    );
    const transportationSector = transportationData.data.series[0];
    let totalEnergyConsumedBySector = [];
    commercialSector.data.map((item, i) => {
      totalEnergyConsumedBySector = [
        ...totalEnergyConsumedBySector,
        {
          month: moment(item[0], 'YYYYMM').format('YYYY-MM'),
          data: [
            {
              sector: 'Commercial',
              value: item[1],
            },
            {
              sector: 'Industrial',
              value: industrialSector.data[i][1],
            },
            {
              sector: 'Residential',
              value: residentialSector.data[i][1],
            },
            {
              sector: 'Trasportation',
              value: transportationSector.data[i][1],
            },
          ],
        },
      ];
    });
    // res.send(totalEnergyConsumedBySector);
    await ConsumptionBySector.collection.insertMany(
      totalEnergyConsumedBySector
    );
    res.status(200).send();
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  //NET PRODUCTION BY SOURCE
  // const rawData = [
  //   {
  //     name: 'coalProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.CLPRBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.CLTCBUS.M`,
  //   },
  //   {
  //     name: 'geothermalProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.GETCBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.GETCBUS.M`,
  //   },
  //   {
  //     name: 'hydroelectricProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.HVTCBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.HVTCBUS.M`,
  //   },
  //   {
  //     name: 'naturalGasProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.NGPRBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.NNTCBUS.M`,
  //   },
  //   {
  //     name: 'nuclearProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.NUETBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.NUETBUS.M`,
  //   },
  //   {
  //     name: 'solarProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.SOTCBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.SOTCBUS.M`,
  //   },
  //   {
  //     name: 'windProduction',
  //     productionUri: `${baseURI}&series_id=TOTAL.WYTCBUS.M`,
  //     consumptionUri: `${baseURI}&series_id=TOTAL.WYTCBUS.M`,
  //   },
  // ];
  // const fetchData = async (data, i) => {
  //   const productionData = await axios.get(data.productionUri);
  //   const production = productionData.data.series[0];
  //   const consumptionData =
  //     data.consumptionUri !== data.productionUri
  //       ? await axios.get(data.consumptionUri)
  //       : productionData;
  //   const consumption = consumptionData.data.series[0];
  //   return {
  //     [data.name]: {
  //       production: production.data,
  //       consumption: consumption.data,
  //     },
  //   };
  // };
  // const getData = async () => {
  //   return Promise.all(rawData.map((data, i) => fetchData(data, i)));
  // };

  // try {
  //   let netProductionBySource = [];
  //   getData().then((data) => {
  //     let dataObject = {};
  //     data.map((item) => {
  //       dataObject = { ...dataObject, ...item };
  //     });
  //     dataObject.coalProduction.production.map((x, i) => {
  //       netProductionBySource = [
  //         ...netProductionBySource,
  //         {
  //           month: moment(x[0], 'YYYYMM').format('YYYY-MM'),
  //           data: [
  //             {
  //               source: 'Coal',
  //               production: x[1],
  //               consumption: dataObject.coalProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Geothermal',
  //               production: dataObject.geothermalProduction.production[i][1],
  //               consumption: dataObject.geothermalProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Hydroelectric',
  //               production: dataObject.hydroelectricProduction.production[i][1],
  //               consumption:
  //                 dataObject.hydroelectricProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Natural Gas',
  //               production: dataObject.naturalGasProduction.production[i][1],
  //               consumption: dataObject.naturalGasProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Nuclear',
  //               production: dataObject.nuclearProduction.production[i][1],
  //               consumption: dataObject.nuclearProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Solar',
  //               production: dataObject.solarProduction.production[i][1],
  //               consumption: dataObject.solarProduction.consumption[i][1],
  //             },
  //             {
  //               source: 'Wind',
  //               production: dataObject.windProduction.production[i][1],
  //               consumption: dataObject.windProduction.consumption[i][1],
  //             },
  //           ],
  //         },
  //       ];
  //     });
  //     // res.send(netProductionBySource).status(200);
  //     ProductionBySource.collection
  //       .insertMany(netProductionBySource)
  //       .then(() => res.status(200).send());
  //   });
  // } catch (e) {
  //   console.error(e.message);
  //   process.exit(1);
  // }
  //EMISSIONS AND ECONOMY
  // try {
  //     const emissionsData = await axios.get(`${baseURI}&series_id=TOTAL.TETCEUS.A&num=10`)
  //     const rawEmissions = emissionsData.data.series[0]
  //     // const expenseData = await axios.get(`${baseURI}&series_id=TOTAL.TEICBUS.M`)
  //     // const expense = industrialData.data.series[0]
  //     let emissions = []
  //     rawEmissions.data.map((edge, i) => {
  //       emissions = [
  //         ...emissions,
  //         {
  //           name: rawEmissions.name,
  //           period: edge[0],
  //           value: edge[1],
  //           unit: rawEmissions.units
  //         }
  //       ]
  //     })
  //     Emissions.collection.insertMany(emissions).then(() => res.status(200).send())
  // } catch (e) {
  //   console.error(e.message)
  //   process.exit(1)
  // }
  // try {
  //   const averageRetailPriceData = await axios.get(`${baseURI}&series_id=TOTAL.ESTCUUS.A&num=10`)
  //   const rawAverageRetailPrice = averageRetailPriceData.data.series[0]
  //   let averageRetailPrice = []
  //   rawAverageRetailPrice.data.map((edge, i) => {
  //     averageRetailPrice = [
  //       ...averageRetailPrice,
  //       {
  //         name: rawAverageRetailPrice.name,
  //         period: edge[0],
  //         value: edge[1],
  //         unit: rawAverageRetailPrice.units
  //       }
  //     ]
  //   })
  //   const energyExpendituresData = await axios.get(`${baseURI}&series_id=TOTAL.TETCVUS.A&num=10`)
  //   const rawEnergyExpenditures = energyExpendituresData.data.series[0]
  //   let energyExpenditures = []
  //   rawEnergyExpenditures.data.map((edge, i) => {
  //     energyExpenditures = [
  //       ...energyExpenditures,
  //       {
  //         name: rawEnergyExpenditures.name,
  //         period: edge[0],
  //         value: edge[1],
  //         unit: rawEnergyExpenditures.units
  //       }
  //     ]
  //   })
  //   console.log(averageRetailPrice, energyExpenditures)
  //   Expenditure.collection.insertMany([...averageRetailPrice,...energyExpenditures]).then(() => res.status(200).send())
  // } catch (e) {
  // console.error(e.message)
  // process.exit(1)
  // }
});

module.exports = router;
