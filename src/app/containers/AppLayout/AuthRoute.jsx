import React from 'react';
import { Route } from 'react-router-dom';

const AuthRoute = ({ component, layout: Layout, ...rest }) => {
  const renderFn = Component => props => {
    if (!!Component) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }
  };
  return <Route {...rest} render={renderFn(component)} />;
};

export default AuthRoute;
