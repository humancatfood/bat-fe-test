import React from 'react';

import { useDailyBookings } from 'data';

import { useHistory } from 'components/Routing';

import DateSelector from 'components/DateSelector';
import BookingsTable from 'components/BookingsTable';



const DailyBookingsView = ({ date }) => {

  const history = useHistory();

  const { bookings, loading, error } = useDailyBookings(date);

  return (
    <section className="table-view">
      <label className="table-view__header">
        <h2 className="bui-app-intro">Bookings for <DateSelector date={date} onChange={date => history.push(`/${date}`)} /></h2>
      </label>
      {
        loading && 'loading..'
      }
      {
        bookings && (
          <BookingsTable className="table-view__body" bookings={bookings}/>
        )
      }
      {
        !loading && bookings && !bookings.length && (
          <div className="table-view__body">
            <p>Sorry, no bookings available for the selected day</p>
          </div>
        )
      }
      {
        error && JSON.stringify(error)
      }
    </section>
  );
};

export default DailyBookingsView;
