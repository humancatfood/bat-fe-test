import React from 'react';
import ReactDOM from 'react-dom';
import { version } from '../package.json';
import './style.css';

import App from './App';

window.console.log('version:', version, '-', process.env.NODE_ENV);


ReactDOM.render(<App />, document.getElementById('root'));
