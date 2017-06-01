import React from 'react';
import { connect } from 'react-redux';

import { selectBooking } from './../data/actions';

import BookingForm from './BookingForm';



@connect(store => ({
  booking: store.bookings.byId[store.ui.selectedBookingId]
}), {
  selectBooking
})
export default class BookingDetailView extends React.Component
{
  render ()
  {
    const { booking, selectBooking } = this.props;

    if (!booking)
    {
      return null;
    }
    else {
      return (
        <section className="bookings-detail-view">
          <h2 className="bui-app-intro">
            Booking update:
            <button onClick={ () => selectBooking(undefined) } style={{float: 'right'}}>X</button>
          </h2>
          <BookingForm booking={ booking }/>
        </section>
      );
    }

  }
}
