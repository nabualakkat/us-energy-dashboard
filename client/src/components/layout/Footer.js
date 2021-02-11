import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '3.5rem',
  },
  text: {
    paddingLeft: '1rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <p className={classes.text}>&copy; Nabhas Alakkat 2021</p>
    </footer>
  );
};

export default Footer;
