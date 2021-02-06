import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
//Local
import store from './store';
import theme from './styles/Theme';
import Landing from './pages/Landing';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';
import './App.css';
//Material-UI
import { ThemeProvider } from '@material-ui/core/styles';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavBar />
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
