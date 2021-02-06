import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Local
import {
  getNPBS,
  getCBS,
  getEmissions,
  getExpenditures,
} from '../actions/data';
import XYChartWrapper from '../components/NPBS/XYChartWrapper';
import PieChartWrapper from '../components/NPBS/PieChartWrapper';
//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  spinner: {
    margin: 'auto',
  },
  container: {
    flex: 1,
  },
}));

export const Landing = ({
  getNPBS,
  getCBS,
  getEmissions,
  getExpenditures,
  npbsLoading,
  cbsLoading,
  emissionsLoading,
  expenditureLoading,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getNPBS();
    getCBS();
    getEmissions();
    getExpenditures();
  }, []);
  const loading =
    npbsLoading || cbsLoading || emissionsLoading || expenditureLoading;

  return loading ? (
    <CircularProgress className={classes.spinner} color="secondary" />
  ) : (
    <div className={classes.container}>
      <GridList
        cellHeight={400}
        spacing={0}
        cols={10}
        className={classes.npbsList}
      >
        <GridListTile cols={3}>
          <PieChartWrapper />
        </GridListTile>
        <GridListTile cols={4.5}>
          <XYChartWrapper />
        </GridListTile>
        <GridListTile cols={2.5}>
          <PieChartWrapper />
        </GridListTile>
      </GridList>
    </div>
  );
};

Landing.propTypes = {
  getNPBS: PropTypes.func.isRequired,
  getCBS: PropTypes.func.isRequired,
  getEmissions: PropTypes.func.isRequired,
  getExpenditures: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  npbsLoading: state.data.npbs.loading,
  cbsLoading: state.data.cbs.loading,
  emissionsLoading: state.data.cbs.loading,
  expenditureLoading: state.data.cbs.loading,
});

export default connect(mapStateToProps, {
  getNPBS,
  getCBS,
  getEmissions,
  getExpenditures,
})(Landing);
