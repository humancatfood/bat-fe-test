import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { sortBy } from './../data/actions';

import { useBookingSelector } from './../data';

import TableHeader from './BookingsTableHeader';



const BookingsTable = ({ bookings, sortProp, sortOrder, className='' }) => {

  const [bid, selectBid] = useBookingSelector();

  return (
    <table className={ classnames('bookings-table', className) }>
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
          _sortBookings(bookings, sortProp, sortOrder).map(booking => (
            <tr key={ booking._id }
              className={ classnames({
                seated: booking.seated,
                cancelled: booking.cancelled,
                selected: bid === booking._id,
              }) }
              onClick={ () => selectBid(booking._id) }>
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
};

function _sortBookings (bookings, sortProp, sortOrder) {
  return bookings.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1 * sortOrder));
}


const mapStateToProps = ({ ui: {sortProp, sortOrder}}) => ({
  sortProp,
  sortOrder,
});


const mapDispatchToProps = {
  sortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTable);
