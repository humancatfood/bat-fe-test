import React from 'react';
import { connect } from 'react-redux';

import DateSelector from './DateSelector';
import BookingsTable from './BookingsTable';



@connect(store => {
  const { bookings: {byDate}, ui: {selectedDate}} = store;
  return {
    hasBookings: byDate && byDate[selectedDate] && byDate[selectedDate].length
  };
})
export default class BookingsTableView extends React.Component
{
  render ()
  {
    const { hasBookings } = this.props;

    return (
      <section>
        <label htmlFor="">
          <h2 className="bui-app-intro">Bookings for <DateSelector /></h2>
        </label>
        {
          hasBookings &&
            <BookingsTable />
        }
        {
          !hasBookings &&
            <div>
              <p>Sorry, no bookings available for the selected day</p>
            </div>
        }
      </section>
    );
  }
}
