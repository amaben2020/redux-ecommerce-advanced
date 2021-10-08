import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.ts';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { googleAuthProvider } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const url = `${process.env.REACT_APP_API}/create-or-update-user`;

const createOrUpdateUser = async (token) => {
  return await axios.post(
    url,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  );
};

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      //sometimes null value is considered as true
      history.push('/');
    }
    //firebase may not give the user immediately so we must watch for the user
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log('Login result', result);
      //destructure user object from result
      const { user } = result;
      //get the token value
      const idTokenResult = await user.getIdTokenResult();
      const { token } = idTokenResult;
      createOrUpdateUser(token)
        .then((res) => {
          console.log('reduxDispatchj', res);

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: res.data.email,
              token: token,
              name: res.data.name,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch();
      // history.push('/');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <Button
          type="primary"
          onClick={handleSubmit}
          className="mb-3 "
          block
          size="large"
          shape="round"
          icon={<MailOutlined />}
          disabled={!email || password.length < 6}
        >
          Login with Email/password
        </Button>
      </form>
    );
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult)
          .then((res) => {
            console.log(res);

            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                email: res.data.email,
                token: idTokenResult,
                name: res.data.name,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch();
        history.push('/');
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading ....</h4>
          )}
          {loginForm()}
          <Button
            type="danger"
            onClick={googleLogin}
            className="mb-3"
            block
            size="large"
            shape="round"
            icon={<GoogleOutlined />}
          >
            Google Login
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
