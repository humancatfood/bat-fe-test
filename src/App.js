/* Feel free to edit */
import React, { Component } from 'react';

import { getBookings } from './data/bookings-service';

import Header from './components/Header';
import BookingsTable from './components/BookingsTable';
import BookingDetailView from './components/BookingDetailView';



// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {

  constructor (...args)
  {
    super(...args);
    this.state = {
      bookings: {}
    };
  }

  componentWillMount ()
  {
    getBookings()
      .then(bookings => this.setState({ bookings }));
  }

  render ()
  {
    const { bookings: {bookings, date}, selected } = this.state;

    return (
      <div className="bui-app">
        <Header />
        <main>
          {
            bookings &&
              <BookingsTable date={ date } bookings={ bookings } selectedBooking={ selected } onSelect={ booking => this._selectBooking(booking)}/>
          }
          {
            selected &&
              <BookingDetailView selectedBooking={ selected } onClose={ () => this._selectBooking(null) } />
          }
        </main>
      </div>
    );
  }

  _selectBooking (booking)
  {
    this.setState({
      selected: booking
    });
  }

}
