import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
//import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.ts';
const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);

  useEffect(() => {
    if (user && user.token) {
      //sometimes null value is considered as true
      history.push('/');
    }
    //firebase may not give the user immediately so we must watch for the user
  }, [history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    //const auth = getAuth();
    auth
      .sendSignInLinkToEmail(email, config)
      .then(() => {
        window.localStorage?.setItem('emailForSignIn', email);
        toast.success(
          `Sent to ${email}, open your email to complete registration`
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage);
        // ...
      });
  };

  const registerForm = () => {
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

        <button type="submit">Register</button>
      </form>
    );
  };

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
      Register
    </div>
  );
};

export default Register;
