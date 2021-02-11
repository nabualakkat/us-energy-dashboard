import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
//Local
import store from './store';
import { light, dark } from './styles/Theme';
import Landing from './pages/Landing';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import './App.css';
//Material-UI
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const App = () => {
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? light : dark);
  const handleClick = () => {
    setTheme(!theme);
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={appliedTheme}>
        <NavBar handleClick={handleClick} theme={theme} />
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
          </Switch>
        </Router>
        <Alert />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
