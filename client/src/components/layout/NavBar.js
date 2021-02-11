import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Local
import { setTheme } from '../../actions/theme';
//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  settingsButton: {
    marginLeft: 'auto',
  },
}));

const NavBar = ({ setAlert, theme, handleClick, setTheme }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h5" color="inherit">
          US Energy Dashboard
        </Typography>
        <IconButton
          onClick={() => {
            handleClick();
            setTheme(theme ? 'dark' : 'light');
          }}
          className={classes.settingsButton}
        >
          {theme ? <Brightness4Icon /> : <Brightness5Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  setTheme: PropTypes.func.isRequired,
};

export default connect(undefined, { setTheme })(NavBar);
