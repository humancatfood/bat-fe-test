/* Feel free to edit */
import React from 'react';

import Header from './components/Header';
import BookingsTable from './components/BookingsTable';



export default function Layout() {
  return (
    <div className="bui-app">
      <Header />
      <BookingsTable />
      <div className="bui-app-header">
        {/*TODO include, or replace heading with, logo */}

      </div>
    </div>
  );
}
