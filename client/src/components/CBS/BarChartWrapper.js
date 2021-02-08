import React, { useState } from 'react';
import { connect } from 'react-redux';

//Local
import XYChart from './XYChart';

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
      <Typography className={classes.title} variant="h6">
        {`Production / Consumption of ${source}`}
      </Typography>
      <BarChart cbs={cbs} source={source} />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  cbs: state.data.cbs.data,
});

export default connect(mapStateToProps)(BarChartWrapper);
