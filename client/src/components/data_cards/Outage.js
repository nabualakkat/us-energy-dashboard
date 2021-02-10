import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Local
import { getOutage } from '../../actions/data';
import DownloadButton from '../DownloadButton';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  loading: {
    margin: 'auto',
  },
}));

export const Outage = ({ getOutage, outage }) => {
  const classes = useStyles();
  const percentGrowth =
    !outage.loading &&
    (
      ((outage.data[0].value - outage.data[1].value) / outage.data[1].value) *
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
  useEffect(() => {
    setInterval(() => {
      getOutage();
    }, 86400000);
  }, [getOutage]);
  const data = !outage.loading && (
    <React.Fragment>
      <DownloadButton data={outage.data} filename="outage.csv" />
      <Typography align="center" variant="h6">
        Nuclear Capacity Outage
      </Typography>
      <div className={classes.valueContainer}>
        <Typography className={classes.value} align="center" variant="h2">
          {outage.data[0].value}
        </Typography>
        {trend ? positive : negative}
      </div>
      <Typography align="center" variant="body2">
        {outage.data[0].unit}
      </Typography>
    </React.Fragment>
  );
  return (
    <Card className={classes.card}>
      {outage.loading ? (
        <CircularProgress className={classes.loading} color="secondary" />
      ) : (
        data
      )}
    </Card>
  );
};

Outage.propTypes = {
  outage: PropTypes.object.isRequired,
  getOutage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  outage: state.data.outage,
});

export default connect(mapStateToProps, { getOutage })(Outage);
