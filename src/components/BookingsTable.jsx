import React from 'react';



export default ({ date, bookings, onSelect }) => (
  <section>
    <h2 className="bui-app-intro">Bookings for { date }:</h2>
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
          bookings.map(booking => (
            <tr key={ booking.id }
                className={ booking.cancelled ? 'cancelled' : '' }
                onClick={ () => onSelect(booking) }>
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
