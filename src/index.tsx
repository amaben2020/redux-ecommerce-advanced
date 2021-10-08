import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
ReactDOM.render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,

  document.getElementById('root')
);

reportWebVitals();
