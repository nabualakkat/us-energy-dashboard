import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Local
import { getGeneration } from '../../actions/data';
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
    position: 'relative',
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

export const Generation = ({ getGeneration, generation }) => {
  const classes = useStyles();

  //TREND AND VALUE
  const percentGrowth =
    !generation.loading &&
    (
      ((generation.data[0].value - generation.data[1].value) /
        generation.data[1].value) *
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
  //DOWNLOAD

  useEffect(() => {
    setInterval(() => {
      getGeneration();
    }, 3600000);
  }, [getGeneration]);
  const data = !generation.loading && (
    <React.Fragment>
      <Typography align="center" variant="h6">
        Net Generation per Hour
      </Typography>
      <div className={classes.valueContainer}>
        <Typography className={classes.value} align="center" variant="h2">
          {generation.data[0].value}
        </Typography>
        {trend ? positive : negative}
      </div>
      <Typography align="center" variant="body2">
        {generation.data[0].unit}
      </Typography>
    </React.Fragment>
  );
  return (
    <Card className={classes.card}>
      {generation.loading ? (
        <CircularProgress className={classes.loading} color="secondary" />
      ) : (
        <React.Fragment>
          <DownloadButton data={generation.data} filename="generation.csv" />
          {data}
        </React.Fragment>
      )}
    </Card>
  );
};

Generation.propTypes = {
  generation: PropTypes.object.isRequired,
  getGeneration: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  generation: state.data.generation,
});

export default connect(mapStateToProps, { getGeneration })(Generation);
