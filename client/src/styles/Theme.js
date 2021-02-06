import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      offWhite: '#f0f0f0',
    },
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FF5722',
    },
  },
});

export default theme;
