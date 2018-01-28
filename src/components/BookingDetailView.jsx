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

    return (
      <section
        className="details-view"
        onClick={ () => selectBooking(undefined) }
      >
        {
          booking && (
            <BookingForm
              className="details-view__body"
              booking={ booking }
            />
          )
        }
      </section>
    );

  }
}
