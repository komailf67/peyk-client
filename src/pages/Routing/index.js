import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import CheckPhone from '../Auth/checkPhone';
import CheckSmsCode from '../Auth/checkSmsCode';
import NewService from '../newService';
import Cargo from '../Profile/Cargo';

const Index = () => {
  const history = useHistory();

  useEffect(() => {
    // if (true) {
    //   history.push('/auth/check-phone');
    // }
  }, []);
  return (
    <Layout>
      <div>
        {/* <nav>
        <ul>
          <li>
            <Link to="/new-service">New Service</Link>
          </li>
        </ul>
      </nav> */}
        <Switch>
          <Route path="/auth/check-phone">
            <CheckPhone />
          </Route>
          <Route ex path="/auth/login">
            <CheckSmsCode />
          </Route>
          <Route path="/new-service">
            <NewService />
          </Route>
          <Route path="/profile/cargo">
            <Cargo />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
};

export default Index;
