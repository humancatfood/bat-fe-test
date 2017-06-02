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
      <section className="details-view">
        {
          booking && (
            <BookingForm className="details-view__body" booking={ booking }>
              <header className="details-view__heading">
                <h2>Booking update:</h2>
                <button onClick={ () => selectBooking(undefined) } className="close-button" title="close" dangerouslySetInnerHTML={{ __html: '&#x02A2F;' }}></button>
              </header>
            </BookingForm>
          )
        }
      </section>
    );

  }
}
