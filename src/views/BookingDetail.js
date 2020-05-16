import React from 'react';
import { useParams } from 'react-router-dom';

import { useSelectedBid, useBookingById, useUpdateBooking } from 'data';

import BookingForm from 'components/BookingForm';
import FormDialog from 'components/FormDialog';



const BookingDetailView = () => {

  const { date } = useParams();

  const [ bid, selectBid ] = useSelectedBid();
  const { booking, loading: bookingIsLoading, error: bookingError } = useBookingById(bid);

  const [ update, { loading: updateIsLoading, validationErrors } ] = useUpdateBooking();

  const onSubmit = args => {
    const { title, firstName, lastName, time, partySize, seated, cancelled, notes } = args;
    update(bid, { title, firstName, lastName, time, partySize, seated, cancelled, date, notes });
  };

  const onCancel = () => selectBid(null);

  return (
    <FormDialog
      title="Booking update"
    >
      {
        bookingIsLoading && 'loading..'
      }
      {
        !bookingIsLoading && !booking && (
          <div>
            404: booking not found
            &nbsp;
            <button onClick={onCancel}>x</button>
          </div>
        )
      }
      {
        bookingError && (
          <div>
            error fetching booking
            &nbsp;
            <button onClick={onCancel}>x</button>
          </div>
        )
      }
      {
        booking && (
          <BookingForm
            className="details-view__body"
            booking={booking}
            onSubmit={onSubmit}
            onCancel={onCancel}
            loading={updateIsLoading}
            errors={validationErrors}
          />
        )
      }
    </FormDialog>
  );

};

export default BookingDetailView;
