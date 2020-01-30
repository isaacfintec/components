import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { havePermission } from './auth';

const PermissionRoute = ({
  component: Component,
  module,
  permission,
  ...rest
}) => (
  <Route {...rest} render={props => (
    havePermission(module, permission)
      ? <Component {...props} />
      : <Redirect to="/panel" />
  )} />
);

export default PermissionRoute;
