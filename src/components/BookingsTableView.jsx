import React from 'react';
import { connect } from 'react-redux';

import DateSelector from './DateSelector';
import BookingsTable from './BookingsTable';



class BookingsTableView extends React.Component
{
  render ()
  {
    const { hasBookings } = this.props;

    return (
      <section className="table-view">
        <label className="table-view__header">
          <h2 className="bui-app-intro">Bookings for <DateSelector /></h2>
        </label>
        {
          hasBookings &&
            <BookingsTable className="table-view__body"/>
        }
        {
          !hasBookings &&
            <div className="table-view__body">
              <p>Sorry, no bookings available for the selected day</p>
            </div>
        }
      </section>
    );
  }
}

const mapStateToProps = ({ bookings: {byDate}, ui: {selectedDate}}) => ({
  hasBookings: !!(byDate && byDate[selectedDate] && byDate[selectedDate].length),
});

export default  connect(mapStateToProps)(BookingsTableView);
