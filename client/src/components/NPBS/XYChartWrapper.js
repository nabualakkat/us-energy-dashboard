import React, { useState } from 'react';
import { connect } from 'react-redux';

//Local
import XYChart from './XYChart';
import DownloadButton from '../DownloadButton';

//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    position: 'relative',
    margin: '0.5rem',
    padding: '1rem',
    width: 'auto',
    height: '98%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
  },
  formControl: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    zIndex: 1000,
  },
}));

const XYChartWrapper = ({ npbs }) => {
  const classes = useStyles();
  const [source, setSource] = useState('Coal');

  const handleChange = (e) => {
    setSource(e.target.value);
  };
  return (
    <Card className={classes.chartWrapper}>
      <DownloadButton data={npbs} filename="net-production.csv" />
      <FormControl
        size="small"
        className={classes.formControl}
        variant="outlined"
      >
        <Select value={source} onChange={handleChange}>
          <MenuItem value="Natural Gas">Natural Gas</MenuItem>
          <MenuItem value="Coal">Coal</MenuItem>
          <MenuItem value="Nuclear">Nuclear</MenuItem>
          <MenuItem value="Wind">Wind</MenuItem>
          <MenuItem value="Hydroelectric">Hydroelectric</MenuItem>
          <MenuItem value="Solar">Solar</MenuItem>
          <MenuItem value="Geothermal">Geothermal</MenuItem>
        </Select>
      </FormControl>
      <Typography className={classes.title} variant="h6">
        {`Production / Consumption of ${source}`}
      </Typography>
      <XYChart npbs={npbs} source={source} />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  npbs: state.data.npbs.data,
});

export default connect(mapStateToProps)(XYChartWrapper);
