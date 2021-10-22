import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.ts';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { googleAuthProvider } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../utils/auth';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) {
        //sometimes null value is considered as true
        history.push('/');
      }
    }

    //firebase may not give the user immediately so we must watch for the user
  }, [history, user]);

  //role based redirect function
  const roleBasedRedirect = (res) => {
    //check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/history');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //destructure user object from result
      const { user } = result;
      //get the token value
      const idTokenResult = await user.getIdTokenResult();
      const { token } = idTokenResult;
      createOrUpdateUser(token)
        .then((res) => {
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
          //role based redirect
          roleBasedRedirect(res);
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
            roleBasedRedirect(res);
          })

          .catch();
        // history.push('/');
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
