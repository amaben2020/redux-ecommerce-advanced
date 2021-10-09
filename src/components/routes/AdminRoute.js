import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../utils/auth';

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      console.log(user.token);
      currentAdmin(user.token)
        .then((res) => {
          console.log('CURRENT ADMIN RESP', res);
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger">
      {' '}
      <LoadingToRedirect />
    </h1>
  );
};

export default AdminRoute;
