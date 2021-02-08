import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '1rem 0.5rem',
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: '2rem',
  },
}));

export const Emissions = ({ emissions }) => {
  const classes = useStyles();
  const percentGrowth = (
    ((emissions[0].value - emissions[1].value) / emissions[1].value) *
    100
  ).toFixed(2);
  const trend = percentGrowth > 0;
  const positive = (
    <div>
      <TrendingUpIcon color="primary" />
      <span>{percentGrowth}%</span>
    </div>
  );
  const negative = (
    <div>
      <TrendingDownIcon color="secondary" />
      <span>{percentGrowth * -1}%</span>
    </div>
  );
  return (
    <Card className={classes.card}>
      <Typography align="center" variant="h6">
        Annual CO2 Emissions
      </Typography>
      <div className={classes.valueContainer}>
        <Typography className={classes.value} align="center" variant="h2">
          {emissions[0].value}
        </Typography>
        {trend ? positive : negative}
      </div>
      <Typography align="center" variant="body2">
        {emissions[0].unit}
      </Typography>
    </Card>
  );
};

Emissions.propTypes = {
  emissions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  emissions: state.data.emissions.data,
});

export default connect(mapStateToProps)(Emissions);
