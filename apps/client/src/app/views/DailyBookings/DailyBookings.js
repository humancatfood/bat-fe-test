import React from 'react';

import { useDailyBookings, useNewBooking, useSelectedBid, useSelectedDate } from '../../data';

import BookingsTable from '../../components/BookingsTable';

import BookingDetailView from '../../views/BookingDetail';
import NewBookingView from '../../views/NewBooking';

import Header from './Header';
import Fab from './Fab';
import * as Layout from './Layout';



const DailyBookingsView = () => {

  const [ selectedDate ] = useSelectedDate();
  const [ selectedBid, setSelectBid ] = useSelectedBid();
  const [ newBooking , setNewBooking ] = useNewBooking();

  const { bookings, loading, error } = useDailyBookings(selectedDate);

  return (
    <Layout.Container>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
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
        <Fab onClick={() => setNewBooking(true)}/>
      </Layout.Main>
    </Layout.Container>
  );
};

export default DailyBookingsView;
