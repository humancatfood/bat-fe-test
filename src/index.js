import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './css/compiled.css';

import configureStore from './data/store';

import App from './App';



ReactDOM.render(
  <ReduxProvider store={ configureStore() }>
    <App />
  </ReduxProvider>,
  document.getElementById('root'),
);
