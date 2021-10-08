import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/Routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './redux/reducers';
//store
//@ts-ignore
const store = createStore(rootReducer, composeWithDevTools());

const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
};

export default App;
