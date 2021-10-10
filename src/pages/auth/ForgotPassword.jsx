import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.ts';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
    const config = {
      //page you land back to relogin with new password
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
        console.log('fPassword', err.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger"> Loading...</h4>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <br />
          <button className="btn btn-raised" disabled={!email}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
