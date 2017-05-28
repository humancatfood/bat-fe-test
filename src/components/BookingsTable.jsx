import React from 'react';

import bookings from '../../bookings.json';



export default () => (
  <section>
    <ul className="bookings-table-list">
      {
        bookings.map(day => (
          <li key={ day.date }>
            <h2 className="bui-app-intro">Bookings for { day.date }:</h2>
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
                  day.bookings.map(booking => (
                    <tr className={booking.cancelled ? 'cancelled' : ''}>
                      <td>{ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }</td>
                      <td>{ booking.time }</td>
                      <td>{ booking.partySize }</td>
                      <td>{ booking.seated ? 'Y' : 'N' }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </li>
        ))
      }
    </ul>
  </section>
);
