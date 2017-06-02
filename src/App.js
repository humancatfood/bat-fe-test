/* Feel free to edit */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { loadLatestBookings } from './data/actions';

import Header from './components/Header';
import BookingsTableView from './components/BookingsTableView';
import BookingDetailView from './components/BookingDetailView';



@connect(store => ({
  hasSelected: !!store.ui.selectedBookingId
}), {
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
        <main className={ classnames('layout__body', {'has-selected': this.props.hasSelected}) }>
          <BookingsTableView />
          <BookingDetailView />
        </main>
      </div>
    );
  }

}
