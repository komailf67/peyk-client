import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import CheckPhone from '../Auth/checkPhone';
import NewService from '../newService';

const Index = () => {
  const history = useHistory();

  useEffect(() => {
    if (true) {
      history.push('/new-service');
    }
  }, []);
  return (
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/new-service">New Service</Link>
          </li>
        </ul>
      </nav> */}
      <Switch>
        <Route path="/new-service">
          <NewService />
        </Route>
        <Route path="/auth/check-phone">
          <CheckPhone />
        </Route>
        <Route path="/new-service">
          <NewService />
        </Route>
      </Switch>
    </div>
  );
};

export default Index;
