/* Feel free to edit */
import React from 'react';

import Header from './components/Header';
import BookingsTable from './components/BookingsTable';
import BookingDetailView from './components/BookingDetailView';



export default function Layout() {
  return (
    <div className="bui-app">
      <Header />
      <main>
        <BookingsTable />
        <BookingDetailView />
      </main>
    </div>
  );
}
