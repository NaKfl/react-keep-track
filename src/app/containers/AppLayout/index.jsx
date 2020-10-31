import React, { memo } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { authRoutes, routes } from './routes';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import AuthLayout from './AuthLayout';
import CommonLayout from './CommonLayout';

export const AppLayout = props => (
  <Switch>
    {authRoutes.map(route => (
      <AuthRoute
        exact
        key={route.key}
        path={route.path}
        component={route.component}
        layout={AuthLayout}
      />
    ))}
    {routes.map(route => (
      <PrivateRoute
        exact
        key={route.key}
        path={route.path}
        component={route.component}
        layout={CommonLayout}
      />
    ))}
    <Redirect to="/login" />
  </Switch>
);

export default memo(AppLayout);
