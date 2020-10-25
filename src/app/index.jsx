import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/globalStyles';
import AppLayout from 'app/containers/AppLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - KT" defaultTitle="Keep Track">
        <meta name="description" content="A React application" />
      </Helmet>
      <Switch>
        //TODO
        {/* <Route path="/notfound" component={NotFoundPage} /> */}
        <Route component={AppLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
