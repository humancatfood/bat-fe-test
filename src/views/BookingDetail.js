import React, { useEffect } from 'react';

import { useBookingSelector, useBookingById, useUpdateBooking } from 'data';

import { useParams } from 'components/Routing';
import BookingForm from 'components/BookingForm';



const BookingDetailView = () => {

  const { date } = useParams();

  const [ bid, selectBid ] = useBookingSelector();
  const { booking, loading, error } = useBookingById(bid);

  const [ update ] = useUpdateBooking();

  useEffect(() => {
    if (error) {
      console.error('error:', error);
      selectBid(undefined);
    }
  }, [ error, selectBid ]);


  const onSubmit = args => {
    const { title, firstName, lastName, time, partySize, seated, cancelled, notes } = args;
    update(bid, { title, firstName, lastName, time, partySize, seated, cancelled, date, notes });
  };


  const onCancel = () => selectBid(null);


  return (
    <section
      className="details-view"
      onClick={ () => selectBid(undefined) }
    >
      {
        loading && 'loading..'
      }
      {
        booking && (
          <BookingForm
            className="details-view__body"
            booking={booking}
            onSubmit={onSubmit}
            onCancel={onCancel}
            selectBid={selectBid}
          />
        )
      }
    </section>
  );

};

export default BookingDetailView;
