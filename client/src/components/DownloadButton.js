import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  download: {
    position: 'absolute',
    right: '0.5rem',
  },
}));
export const DownloadButton = ({ data, filename }) => {
  const classes = useStyles();
  const [headers, setHeaders] = useState([]);
  const [dataToConvert, setDataToConvert] = useState(data);
  useEffect(() => {
    switch (filename) {
      case 'generation.csv':
        const generationData = data.map((data) => ({
          ...data,
          period: moment(data.period, 'YYYYMMDDHH').format('MM-DD-YYYY HH:00'),
        }));
        setDataToConvert(generationData);
        setHeaders([
          { label: 'Period', key: 'period' },
          { label: 'Value', key: 'value' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      case 'emissions.csv':
      case 'outage.csv':
        const emissionData = data.map((data) => ({
          ...data,
          period: moment(data.period).format('MM-DD-YYYY'),
        }));
        setDataToConvert(emissionData);
        setHeaders([
          { label: 'Period', key: 'period' },
          { label: 'Value', key: 'value' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      case 'expenditure.csv':
        const expenditureData = data.map((data) => ({
          ...data,
          period: moment(data.period).format('MM-DD-YYYY'),
        }));
        setDataToConvert(expenditureData);
        setHeaders([
          { label: 'Data', key: 'name' },
          { label: 'Period', key: 'period' },
          { label: 'Value', key: 'value' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      case 'regional-generation.csv':
        let regionalData = [];
        data.map((d) => {
          d.value.map((a) => {
            regionalData.push({
              region: d.region,
              period: moment(a[0], 'YYYYMMDDTHHZ').format('MM-DD-YYYY HH:00'),
              value: a[1],
              unit: 'Megawatthours',
            });
          });
        });
        setDataToConvert(regionalData);
        setHeaders([
          { label: 'Region', key: 'region' },
          { label: 'Period', key: 'period' },
          { label: 'Value', key: 'value' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      case 'consumption-by-sector.csv':
        let consumptionData = [];
        data.map((d) => {
          d.data.map((a) => {
            consumptionData.push({
              date: moment(d.month).format('MM-DD-YYYY'),
              sector: a.sector,
              value: a.value,
              unit: 'Trillion BTUs',
            });
          });
        });
        setDataToConvert(consumptionData);
        setHeaders([
          { label: 'Period', key: 'date' },
          { label: 'Sector', key: 'sector' },
          { label: 'Energy', key: 'value' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      case 'net-production.csv':
        let npbsData = [];
        data.map((d) => {
          d.data.map((a) => {
            npbsData.push({
              date: moment(d.month).format('MM-DD-YYYY'),
              source: a.source,
              production: a.production,
              consumption: a.consumption,
              unit: 'Trillion BTUs',
            });
          });
        });
        setDataToConvert(npbsData);
        setHeaders([
          { label: 'Period', key: 'date' },
          { label: 'Source', key: 'source' },
          { label: 'Production', key: 'production' },
          { label: 'Consumption', key: 'consumption' },
          { label: 'Unit', key: 'unit' },
        ]);
        break;
      default: {
        break;
      }
    }
  }, [data, filename, setHeaders, setDataToConvert]);
  console.log(filename);
  console.log(dataToConvert);
  return dataToConvert !== undefined ? (
    <IconButton
      className={classes.download}
      component={CSVLink}
      data={dataToConvert}
      headers={headers}
      filename={filename}
    >
      <GetAppIcon />
    </IconButton>
  ) : (
    <IconButton>
      <GetAppIcon />
    </IconButton>
  );
};

export default DownloadButton;
