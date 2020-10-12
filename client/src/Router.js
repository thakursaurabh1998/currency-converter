import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Converter from './pages/Converter';
import Login from './pages/Login';
import Loading from './common-components/Loading';
import NotFound from './common-components/NotFound';
import { RoutesEnum } from './constants';

function NewRoute(path, component) {
  return {
    path,
    component,
  };
}

// All the open routes go here
const openRoutes = [NewRoute(RoutesEnum.LOGIN, Login)];

// All the secure routes go here
const secureRoutes = [NewRoute(RoutesEnum.ROOT, Converter)];

function getRoutes(secure) {
  const finalRoutes = (secure ? secureRoutes : openRoutes).map((route) => (
    <Route exact path={route.path} key={route.path} component={route.component} />
  ));
  return finalRoutes;
}

export default function InternalRouter({ isAuthenticated }) {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {[getRoutes(false)]}
        {isAuthenticated === false && <Redirect to={RoutesEnum.LOGIN} />}
        {[getRoutes(true)]}
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}
