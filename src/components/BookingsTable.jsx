import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { selectBooking } from './../data/actions';

import DateSelector from './DateSelector';



@connect(store => {
  const { bookings: {byId={}, byDate={}}, ui: {selectedDate=null}} = store;
  const ids = byDate[selectedDate];
  return {
    bookings: ids && ids.map(id => byId[id]),
    selectedBooking: store.ui.selectedBooking
  };
}, {
  selectBooking
})
export default class BookingsTable extends React.Component
{
  render ()
  {
    const { bookings, selectedBooking, selectBooking } = this.props;

    return (
      <section>
        <label htmlFor="">
          <h2 className="bui-app-intro">Bookings for <DateSelector /></h2>
        </label>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Covers</th>
              <th>Seated</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings && bookings.map(booking => (
                <tr key={ booking.id }
                    className={ classnames({
                      cancelled: booking.cancelled,
                      selected: selectedBooking && booking.id === selectedBooking.id
                    }) }
                    onClick={ () => selectBooking(booking) }>
                  <td>{ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }</td>
                  <td>{ booking.time }</td>
                  <td>{ booking.partySize }</td>
                  <td>{ booking.seated ? 'Y' : 'N' }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}
