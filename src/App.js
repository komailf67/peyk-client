import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import RTL from './theme/RTL';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './pages/Routing/index';
import { store } from './redux/store';
import history from './utils/history';
import Notification from './components/notification';
import RedirectComponent from './components/redirectComponent';

const App = () => {
  return (
    <RTL>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router history={history}>
            <RedirectComponent />
            <Notification />
            <Routing />
          </Router>
        </Provider>
      </MuiThemeProvider>
    </RTL>
  );
};

export default App;
