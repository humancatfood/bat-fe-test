/* Feel free to edit */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadLatestBookings } from './data/actions';

import Header from './components/Header';
import BookingsTable from './components/BookingsTable';
import BookingDetailView from './components/BookingDetailView';



@connect(() => ({}), {
  loadLatestBookings
})
export default class App extends Component {

  componentWillMount ()
  {
    this.props.loadLatestBookings();
  }

  render ()
  {
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

}
