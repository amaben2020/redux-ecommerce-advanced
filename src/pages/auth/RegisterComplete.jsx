import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.ts';

const Register = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

  console.log(email);

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error('Email and password required');
      return;
    }

    if (password.length < 6) {
      toast.error(' password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');

        //getting user id token
        let user = auth.currentUser;

        //update the password
        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);
        console.log('idToken ', idTokenResult);
        //redux store

        //redirect the user
        history.push('/');
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="password"
        />
        <button type="submit">Complete Registration</button>
      </form>
    );
  };

  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegisterForm()}
        </div>
      </div>
      Register
    </div>
  );
};

export default Register;
