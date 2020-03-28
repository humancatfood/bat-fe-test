import React from 'react';

import logo from '../assets/img/bookatable-by-michelin-logo.svg';

import { Link } from './Routing';



export default (props) => (
  <header {...props} >
    <Link to="/">
      <img src={ logo } alt="Bookatable by Michelin" className="header__img"/>
    </Link>
  </header>
);
