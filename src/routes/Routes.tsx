import React from 'react';
import { Switch, Route } from 'react-router';
import Home from '../pages/Home';
import Navbar from './../components/nav/Navbar';

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
