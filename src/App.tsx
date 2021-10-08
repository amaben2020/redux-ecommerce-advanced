import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/Routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './redux/reducers';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';

const App = () => {
  const dispatch = useDispatch();

  //@ts-ignore
  const store = createStore(rootReducer, composeWithDevTools());

  useEffect(() => {
    //onAuthStateChanged exposes us to the user information
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //getIdTokenResult gives us the userToken
        const idTokenResult = await user.getIdTokenResult();
        console.log(user);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
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
