import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/Routes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';

const App = () => {
  const dispatch = useDispatch();

  //This useEffect simply puts the user details when the app lunches, it automatically tries to login a user if logged out

  useEffect(() => {
    //onAuthStateChanged exposes us to the user information
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //getIdTokenResult gives us the userToken
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      } else if (!user) {
        toast.error('Please sign in to enjoy app functionality');
      }
    });

    //cleanup
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes />
    </div>
  );
};

export default App;
