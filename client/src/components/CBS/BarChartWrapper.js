import React, { useState } from 'react';
import { connect } from 'react-redux';

//Local
import BarChart from './BarChart';
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

const BarChartWrapper = ({ cbs }) => {
  const classes = useStyles();
  return (
    <Card className={classes.chartWrapper}>
      <DownloadButton data={cbs} filename="consumption-by-sector.csv" />
      <Typography className={classes.title} variant="h6">
        Consumption by Sector
      </Typography>
      <BarChart cbs={cbs} />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  cbs: state.data.cbs.data,
});

export default connect(mapStateToProps)(BarChartWrapper);
