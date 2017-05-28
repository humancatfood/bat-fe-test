/* Feel free to edit */
import React from 'react';

import Header from './components/Header';



export default function Layout() {
  return (
    <div className="bui-app">
      <Header/>
      <div className="bui-app-header">
        {/*TODO include, or replace heading with, logo */}
        <h1 className="bui-app-intro">Table Reservations</h1>
      </div>
    </div>
  );
}
