import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//Local
import PieChart from './PieChart';
//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    position: 'relative',
    padding: '1rem',
    margin: '0.5rem',
    maxWidth: '400px',
    height: '330px',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '.8rem',
  },
}));

const PieChartWrapper = ({ npbs }) => {
  const classes = useStyles();
  const createData = (source, production, consumption) => ({
    source,
    production,
    consumption,
  });

  return <Card className={classes.chartWrapper}></Card>;
};

PieChartWrapper.propTypes = {
  npbs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  npbs: state.data.npbs.data,
});

export default connect(mapStateToProps)(PieChartWrapper);
