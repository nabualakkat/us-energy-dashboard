import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//Local
import Map from './Map';
//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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

const RegionalWrapper = ({ regional }) => {
  const classes = useStyles();
  const [value, setValue] = useState('Production');
  return (
    <Card className={classes.chartWrapper}>
      <Typography className={classes.title} variant="h6">
        Regional Electricity Generation
      </Typography>

      <Map regional={regional} />
    </Card>
  );
};

RegionalWrapper.propTypes = {
  regional: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  regional: state.data.regional.data,
});

export default connect(mapStateToProps)(RegionalWrapper);
