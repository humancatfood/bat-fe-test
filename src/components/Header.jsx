import React from 'react';

import logo from '../assets/img/bookatable-by-michelin-logo.svg';



export default (props) => (
  <header {...props} >
    <img src={ logo } alt="Bookatable by Michelin" className="header__img"/>
  </header>
);
