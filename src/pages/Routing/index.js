import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Layout from '../../components/Layout';
import PrivateRoute from '../../components/Routes/PrivateRoute';
import PublicRoute from '../../components/Routes/PublicRoute';
import CheckPhone from '../Auth/checkPhone';
import CheckSmsCode from '../Auth/checkSmsCode';
import NewService from '../newService';
import Failed from '../PaymentResult/Failed';
import Success from '../PaymentResult/Success';
import Cargo from '../Profile/Cargo';

const Index = () => {
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
          <PrivateRoute component={NewService} path="/" exact />
          <PublicRoute component={CheckPhone} restricted path="/auth/check-phone" exact />
          <PublicRoute component={CheckSmsCode} restricted path="/auth/login" exact />
          <PrivateRoute component={NewService} path="/new-service" exact />
          <PrivateRoute component={Cargo} path="/profile/cargo" exact />
          <PrivateRoute component={Failed} path="/payment/failed" exact />
          <PrivateRoute component={Success} path="/payment/success" exact />
        </Switch>
      </div>
    </Layout>
  );
};

export default Index;
