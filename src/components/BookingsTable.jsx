import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { selectBooking, sortBy } from './../data/actions';

import TableHeader from './BookingsTableHeader';



@connect(store => {
  // TODO: refactor this. This component knows way too much about the store-layout
  const { bookings: {byId={}, byDate={}}, ui: {selectedDate=null, sortProp, sortOrder}} = store;
  const ids = byDate[selectedDate];
  return {
    bookings: ids && ids.map(id => byId[id]),
    selectedBookingId: store.ui.selectedBookingId,
    sortProp,
    sortOrder
  };
}, {
  selectBooking,
  sortBy
})
export default class BookingsTable extends React.Component
{
  render()
  {
    const { bookings, selectedBookingId, selectBooking, sortProp, sortOrder } = this.props;

    return (
      <table className={ classnames('bookings-table', this.props.className) }>
        <thead>
        <tr>
          <TableHeader value="lastName" label="Name" />
          <TableHeader value="time" label="Time" />
          <TableHeader value="partySize" label="Covers" />
          <TableHeader value="seated" label="Seated" />
        </tr>
        </thead>
        <tbody>
        {
          this._sortBookings(bookings, sortProp, sortOrder).map(booking => (
            <tr key={ booking.id }
                className={ classnames({
                  seated: booking.seated,
                  cancelled: booking.cancelled,
                  selected: selectedBookingId === booking.id
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
    );
  }

  _sortBookings (bookings, sortProp, sortOrder)
  {
    return bookings.sort((a, b) => (a[sortProp] > b[sortProp] && 1 || -1)  * sortOrder);
  }

}
