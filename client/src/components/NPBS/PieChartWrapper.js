import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//Local
import PieChart from './PieChart';
//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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
  buttonGroup: {
    position: 'absolute',
    top: '25%',
    left: '5%',
    fontSize: '.8rem',
    zIndex: 1000,
  },
  button: {
    fontSize: '0.5rem',
  },
}));

const PieChartWrapper = ({ npbs }) => {
  const classes = useStyles();
  const [value, setValue] = useState('production');
  return (
    <Card className={classes.chartWrapper}>
      <ButtonGroup
        className={classes.buttonGroup}
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => setValue('production')}
          color={value === 'production' ? 'primary' : 'default'}
          disableElevation={value === 'production'}
          disableRipple
          className={classes.button}
        >
          Production
        </Button>
        <Button
          onClick={() => setValue('consumption')}
          color={value === 'consumption' ? 'primary' : 'default'}
          disableElevation={value === 'consumption'}
          disableRipple
          className={classes.button}
        >
          Consumption
        </Button>
      </ButtonGroup>
      <Typography className={classes.title} variant="h6">
        Total Production by Source
      </Typography>
      <Typography
        className={`${classes.title} ${classes.subtitle}`}
        variant="subtitle1"
      >
        Latest Available: {moment(npbs[0].month).format('MMM YYYY')}
      </Typography>
      <PieChart npbs={npbs} type={value} />
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
