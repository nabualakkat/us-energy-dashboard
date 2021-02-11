import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Local
import {
  getNPBS,
  getCBS,
  getEmissions,
  getExpenditures,
  getGeneration,
  getOutage,
  getRegionalGeneration,
} from '../actions/data';
import XYChartWrapper from '../components/NPBS/XYChartWrapper';
import PieChartWrapper from '../components/NPBS/PieChartWrapper';
import DataTable from '../components/NPBS/DataTable';
import Emissions from '../components/data_cards/Emissions';
import Expenditures from '../components/data_cards/Expenditures';
import Generation from '../components/data_cards/Generation';
import Outage from '../components/data_cards/Outage';
import RegionalWrapper from '../components/Regional/RegionalWrapper';
import BarChartWrapper from '../components/CBS/BarChartWrapper';
//Material-UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  getGeneration,
  getOutage,
  getRegionalGeneration,
  npbsLoading,
  cbsLoading,
  emissionsLoading,
  expenditureLoading,
  regionalLoading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getNPBS();
    getCBS();
    getEmissions();
    getExpenditures();
    getGeneration();
    getOutage();
    getRegionalGeneration();
  }, [
    getNPBS,
    getCBS,
    getExpenditures,
    getEmissions,
    getGeneration,
    getOutage,
    getRegionalGeneration,
  ]);
  const loading =
    npbsLoading ||
    cbsLoading ||
    emissionsLoading ||
    expenditureLoading ||
    regionalLoading;

  return loading ? (
    <CircularProgress className={classes.spinner} color="secondary" />
  ) : (
    <div className={classes.container}>
      <GridList
        cellHeight={120}
        spacing={0}
        cols={medium ? 4 : 8}
        className={classes.npbsList}
      >
        <GridListTile className={classes.tile} cols={small ? 4 : 2}>
          <Generation />
        </GridListTile>
        <GridListTile className={classes.tile} cols={small ? 4 : 2}>
          <Outage />
        </GridListTile>
        <GridListTile className={classes.tile} cols={small ? 4 : 2}>
          <Expenditures />
        </GridListTile>

        <GridListTile className={classes.tile} cols={small ? 4 : 2}>
          <Emissions />
        </GridListTile>
      </GridList>
      <GridList
        className={classes.list}
        cellHeight={500}
        spacing={0}
        cols={medium ? 4 : 10}
        className={classes.npbsList}
      >
        <GridListTile
          className={classes.tile}
          cols={small ? 4 : medium ? 2 : 3}
        >
          <PieChartWrapper />
        </GridListTile>
        <GridListTile
          className={classes.tile}
          cols={small ? 4 : medium ? 2 : 2.5}
        >
          <DataTable />
        </GridListTile>
        <GridListTile className={classes.tile} cols={medium ? 4 : 4.5}>
          <XYChartWrapper />
        </GridListTile>
      </GridList>
      <GridList
        className={classes.list}
        cellHeight={500}
        spacing={0}
        cols={6}
        className={classes.npbsList}
      >
        <GridListTile className={classes.tile} cols={medium ? 6 : 4}>
          <RegionalWrapper />
        </GridListTile>
        <GridListTile className={classes.tile} cols={medium ? 6 : 2}>
          <BarChartWrapper />
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
  getGeneration: PropTypes.func.isRequired,
  getOutage: PropTypes.func.isRequired,
  npbsLoading: PropTypes.bool.isRequired,
  cbsLoading: PropTypes.bool.isRequired,
  emissionsLoading: PropTypes.bool.isRequired,
  expenditureLoading: PropTypes.bool.isRequired,
  regionalLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  npbsLoading: state.data.npbs.loading,
  cbsLoading: state.data.cbs.loading,
  emissionsLoading: state.data.cbs.loading,
  expenditureLoading: state.data.expenditure.loading,
  regionalLoading: state.data.regional.loading,
});

export default connect(mapStateToProps, {
  getNPBS,
  getCBS,
  getEmissions,
  getExpenditures,
  getGeneration,
  getOutage,
  getRegionalGeneration,
})(Landing);
