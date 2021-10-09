import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/Routes.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { currentUser } from './utils/auth';

const App = () => {
  const dispatch = useDispatch();

  //This useEffect simply puts the user details when the app lunches, it automatically tries to login a user if logged out

  useEffect(() => {
    //onAuthStateChanged exposes us to the user information
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //getIdTokenResult gives us the userToken
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res: any) => {
            console.log(res);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                token: idTokenResult.token,
                _id: res.data.id,
                email: res.data.email,
                role: res.data.role,
              },
            });
          })
          .catch();
      } else if (!user) {
        toast.error('Please sign in to enjoy app functionality');
      }
    });

    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes />
    </div>
  );
};

export default App;
