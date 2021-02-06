import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

//Local
import PieChart from './PieChart';
//Material-UI
import { makeStyles, useTheme } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
  unit: {
    fontSize: '.65rem',
  },
  table: {
    width: '100%',
  },
  cell: {
    paddingInline: 0,
  },
}));

const DataTable = ({ npbs }) => {
  const classes = useStyles();
  const [value, setValue] = useState(moment(npbs[0].month));
  console.log(value);
  const set = npbs.filter(
    (d) => moment(d.month).format('YYYY MM') === moment(value).format('YYYY MM')
  );
  console.log(set);
  const rows = set[0].data;
  return (
    <Card className={classes.chartWrapper}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <IconButton
            onClick={() => setValue(moment(value).subtract(1, 'months'))}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {moment(value).format('MMMM YYYY')}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() =>
              set.length > 0 && setValue(moment(value).add(1, 'months'))
            }
            disabled={value >= moment(npbs[0].month)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Table className={classes.table} size="small" aria-label="npbs-table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>Source</TableCell>
            <TableCell className={classes.cell} align="right">
              Production{' '}
              <Typography className={classes.unit} variant="subtitle1">
                (Trillion&nbsp;BTUs)
              </Typography>
            </TableCell>
            <TableCell className={classes.cell} align="right">
              Consumption{' '}
              <Typography className={classes.unit} variant="subtitle1">
                (Trillion&nbsp;BTUs)
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.source}>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.source}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.production}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.consumption}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

DataTable.propTypes = {
  npbs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  npbs: state.data.npbs.data,
});

export default connect(mapStateToProps)(DataTable);
