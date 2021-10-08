import React, { useState } from 'react';
import { toast } from 'react-toastify';

//import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.ts';
const Register = () => {
  const [email, setEmail] = useState('');

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
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
