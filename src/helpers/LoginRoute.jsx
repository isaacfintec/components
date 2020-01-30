
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './auth';

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth()
      ? <Redirect to="/panel" />
      : <Component {...props} />
  )} />
);

export default LoginRoute;
