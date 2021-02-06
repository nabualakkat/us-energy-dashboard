import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '3.5rem',
  },
}));
const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>&copy; Nabhas Alakkat 2021</footer>;
};

export default Footer;
