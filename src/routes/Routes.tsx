import React from 'react';
import { Switch, Route } from 'react-router';
import Complete from '../pages/auth/RegisterComplete';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Navbar from './../components/nav/Navbar';
import ForgotPassword from '../pages/auth/ForgotPassword';
import History from './../pages/user/History';
import UserRoute from '../components/routes/UserRoute';
import WishList from '../pages/user/WishList';
import Password from '../pages/user/Password';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoute from '../components/routes/AdminRoute';

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
        <UserRoute>
          <Route exact path={'/user/history'} component={History} />
          <Route exact path={'/user/wishlist'} component={WishList} />
          <Route exact path={'/user/password'} component={Password} />
        </UserRoute>
        <AdminRoute>
          <Route exact path={'/admin/dashboard'} component={AdminDashboard} />
        </AdminRoute>
      </Switch>
    </>
  );
};

export default Routes;
