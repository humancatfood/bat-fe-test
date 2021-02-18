import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelectedBid, useBookingById, useUpdateBooking } from '../data';

import BookingFormDialog from '../components/BookingFormDialog';
import Error from '../components/Error';



const BookingDetailView = () => {

  const { date } = useParams();

  const [ bid, selectBid ] = useSelectedBid();
  const { booking, loading, error: bookingError } = useBookingById(bid);
  const [ update, { validationErrors } ] = useUpdateBooking();

  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (!loading && !booking) {
      setError('404: booking not found');
    } else if (bookingError) {
      setError('error fetching booking');
    }
  }, [loading, booking, bookingError]);

  const onSubmit = booking => {
    const { title, firstName, lastName, time, partySize, seated, cancelled, notes } = booking;
    update(bid, { title, firstName, lastName, time, partySize, seated, cancelled, date, notes })
      .then(() => selectBid(null))
      .catch(console.error.bind(null, 'error:'));
  };

  const onCancel = () => selectBid(null);

  if (error) {
    return (
      <Error onClose={setError.bind(null, false)}>{error}</Error>
    );
  } else {
    return (
      <BookingFormDialog
        title="Booking update"
        booking={booking}
        isLoading={loading}
        errors={validationErrors}
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitLabel="Save Changes"
        date={date}
      />
    );
  }

};

export default BookingDetailView;
