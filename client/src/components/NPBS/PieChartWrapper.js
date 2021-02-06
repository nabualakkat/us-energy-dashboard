import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//Local
import PieChart from './PieChart';
//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
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
  return (
    <Card className={classes.chartWrapper}>
      <Typography className={classes.title} variant="h6">
        Total Production by Source
      </Typography>
      <Typography
        className={`${classes.title} ${classes.subtitle}`}
        variant="subtitle1"
      >
        Latest Available: {moment(npbs[0].month).format('MMM YYYY')}
      </Typography>
      <PieChart npbs={npbs} />
    </Card>
  );
};

PieChartWrapper.propTypes = {
  npbs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  npbs: state.data.npbs.data,
});

export default connect(mapStateToProps)(PieChartWrapper);
