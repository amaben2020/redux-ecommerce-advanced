import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 className="text-danger">
      {' '}
      <LoadingToRedirect />
    </h1>
  );
};

export default UserRoute;
