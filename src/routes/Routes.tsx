import React from 'react';
import { Switch, Route } from 'react-router';
import Complete from '../pages/auth/RegisterComplete';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Navbar from './../components/nav/Navbar';
import ForgotPassword from '../pages/auth/ForgotPassword';

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/register/complete'} component={Complete} />
        <Route exact path={'/forgot/password'} component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default Routes;
