import React from 'react';

import { useBookingSelector } from './../data';

import BookingForm from './BookingForm';



const BookingDetailView = () => {

  const [bid, selectBid] = useBookingSelector();

  return (
    <section
      className="details-view"
      onClick={ () => selectBid(undefined) }
    >
      {
        bid && (
          <BookingForm
            className="details-view__body"
            bid={bid}
            selectBid={selectBid}
          />
        )
      }
    </section>
  );

};

export default BookingDetailView;
