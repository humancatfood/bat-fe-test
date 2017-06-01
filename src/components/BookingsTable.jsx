import React from 'react';
import classnames from 'classnames';



export default ({ bookings, selectedBooking, onSelectBooking }) => (
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
              onClick={ () => onSelectBooking(booking) }>
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
