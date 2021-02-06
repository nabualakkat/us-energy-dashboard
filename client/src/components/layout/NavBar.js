import React from 'react'
import {connect} from 'react-redux'

//Local


//Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings'
import {makeStyles, useTheme} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  settingsButton: {
    marginLeft: 'auto'
  }
}))

const NavBar = ({setAlert}) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
      <Typography variant="h6" color="inherit">
        US Energy Dashboard
      </Typography>
      <IconButton className={classes.settingsButton}>
        <SettingsIcon/>
      </IconButton>
      </Toolbar>  
    </AppBar>
  )
}

export default connect()(NavBar)

