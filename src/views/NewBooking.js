import React from 'react';

import { useCreateBooking, useNewBooking } from 'data';

import { useParams } from 'components/Routing';
import BookingForm from 'components/BookingForm';



const emptyBooking = () => ({
  title: undefined,
  firstName: undefined,
  lastName: undefined,
  time: '--:--',
  partySize: undefined,
  seated: false,
  cancelled: false,
  notes: '',
});

const NewBookingView = () => {

  const { date } = useParams();

  const [ _ignore_me_, setNewBooking ] = useNewBooking();
  const [ create, { /* booking: newBooking,  */loading /* error, ...rest */ }] = useCreateBooking();

  const booking = emptyBooking();

  const onSubmit = args => {
    const { title, firstName, lastName, time, partySize, seated, cancelled, notes } = args;
    create({ title, firstName, lastName, time, partySize, seated, cancelled, date, notes });
  };

  const onCancel = () => setNewBooking(false);


  return (
    <section className="details-view">
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
          />
        )
      }
    </section>
  );

};

export default NewBookingView;
