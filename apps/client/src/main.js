import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import App from './app/App';

import {version} from '../../../package.json';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

window.console.log('version:', version, '-', process.env.NODE_ENV);
