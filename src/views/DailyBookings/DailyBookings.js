import React from 'react';

import { useDailyBookings, useNewBooking, useSelectedBid, useSelectedDate } from 'data';

import BookingsTable from 'components/BookingsTable';

import BookingDetailView from 'views/BookingDetail';
import NewBookingView from 'views/NewBooking';

import Header from './Header';



const DailyBookingsView = () => {

  const [ selectedDate ] = useSelectedDate();
  const [ selectedBid, setSelectBid ] = useSelectedBid();
  const [ newBooking , setNewBooking ] = useNewBooking();

  const { bookings, loading, error } = useDailyBookings(selectedDate);

  return (
    <>
      <Header />
      <section className="table-view">
        <label className="table-view__header">
          <button onClick={() => setNewBooking(true)}>Create New Booking</button>
        </label>
        {
          loading && 'loading..'
        }
        {
          bookings && (
            <BookingsTable
              className="table-view__body"
              bookings={bookings}
              selectedId={selectedBid}
              selectId={setSelectBid}
            />
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
      {
        selectedBid && (
          <BookingDetailView />
        )
      }
      {
        newBooking && (
          <NewBookingView />
        )
      }
    </>
  );
};

export default DailyBookingsView;