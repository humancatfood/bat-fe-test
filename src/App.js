/* Feel free to edit */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadLatestBookings } from './data/actions';

import Header from './components/Header';
import BookingsTableView from './components/BookingsTableView';
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
      <div className="layout">
        <Header className="layout__header"/>
        <main className="layout__body">
          <BookingsTableView />
          <BookingDetailView />
        </main>
      </div>
    );
  }

}
