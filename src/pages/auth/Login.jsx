import { Button } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.ts';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      //destructure user object from result
      const { user } = result;
      //get the token value
      const idTokenResult = await user.getIdTokenResult();
      const { token } = idTokenResult;
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: token,
        },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
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

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
