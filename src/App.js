import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './pages/Routing/index';
import { store } from './redux/store';
import history from './utils/history';
import Notification from './components/notification';
import RedirectComponent from './components/redirectComponent';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <RedirectComponent />
        <Notification />
        <Routing />
      </Router>
    </Provider>
  );
};

export default App;
