import React from 'react';
import { Switch, Route } from 'react-router';
import Complete from '../pages/auth/RegisterComplete';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Navbar from '../components/nav/Navbar';
import ForgotPassword from '../pages/auth/ForgotPassword';
import History from '../pages/user/History';
import UserRoute from '../components/routes/UserRoute';
import WishList from '../pages/user/WishList';
import Password from '../pages/user/Password';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminRoute from '../components/routes/AdminRoute';
import CategoryCreate from '../pages/admin/category/CategoryCreate';
import CategoryUpdate from '../pages/admin/category/CategoryUpdate';
import SubCreate from '../pages/admin/category/SubCreate';
import SubUpdate from '../pages/admin/category/SubUpdate';
import ProductCreate from '../product/ProductCreate';
import AllProducts from '../product/AllProducts';
import ProductUpdate from '../product/ProductUpdate';
import Product from '../pages/Product';
import CategoryList from '../components/category/CategoryList';
import CategoryHome from '../pages/category/CategoryHome';

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/product/:slug'} component={Product} />
        <Route exact path={'/register/complete'} component={Complete} />
        <Route exact path={'/forgot/password'} component={ForgotPassword} />
        <Route exact path={'/category/:slug'} component={CategoryHome} />
        <AdminRoute exact path={'/admin/category'} component={CategoryCreate} />
        <AdminRoute
          exact
          path={'/admin/dashboard'}
          component={AdminDashboard}
        />
        <AdminRoute
          exact
          path={'/admin/category/:slug'}
          component={CategoryUpdate}
        />
        <AdminRoute exact path={'/admin/product'} component={ProductCreate} />
        <AdminRoute exact path={'/admin/sub/:slug'} component={SubUpdate} />
        <AdminRoute exact path={'/admin/products'} component={AllProducts} />
        <AdminRoute
          exact
          path={'/admin/product/:slug'}
          component={ProductUpdate}
        />

        <AdminRoute exact path={'/admin/sub'} component={SubCreate} />

        <UserRoute>
          <Route exact path={'/user/history'} component={History} />
          <Route exact path={'/user/wishlist'} component={WishList} />
          <Route exact path={'/user/password'} component={Password} />
        </UserRoute>
      </Switch>
    </>
  );
};

export default Routes;
