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
    padding: '1rem',
    width: 'auto',
    margin: '0.5rem',
    height: '98%',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '.8rem',
  },
  buttonGroup: {
    width: '100%',
    fontSize: '.8rem',
    zIndex: 1000,
  },
  button: {
    fontSize: '0.5rem',
    width: '50%',
  },
}));

const PieChartWrapper = ({ npbs }) => {
  const classes = useStyles();
  const [value, setValue] = useState('Production');
  return (
    <Card className={classes.chartWrapper}>
      <Typography className={classes.title} variant="h6">
        Total {value} by Source
      </Typography>
      <Typography
        className={`${classes.title} ${classes.subtitle}`}
        variant="subtitle1"
      >
        Latest Available: {moment(npbs[0].month).format('MMM YYYY')}
      </Typography>
      <ButtonGroup
        className={classes.buttonGroup}
        size="small"
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => setValue('Production')}
          color={value === 'Production' ? 'primary' : 'default'}
          disableElevation={value === 'Production'}
          disableRipple
          className={classes.button}
        >
          Production
        </Button>
        <Button
          onClick={() => setValue('Consumption')}
          color={value === 'Consumption' ? 'primary' : 'default'}
          disableElevation={value === 'Consumption'}
          disableRipple
          className={classes.button}
        >
          Consumption
        </Button>
      </ButtonGroup>
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
