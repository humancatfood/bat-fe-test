import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useCreateBooking, useNewBooking, useSelectedBid } from 'data';

import BookingFormDialog from 'components/BookingFormDialog';



const emptyBooking = () => ({
  title: 'Mr',
  firstName: '',
  lastName: '',
  time: moment().add(1, 'hour').startOf('hour').format('HH:mm'),
  partySize: 2,
  notes: '',
});

const NewBookingView = () => {

  const { date } = useParams();
  const [ _, setSelectedBid ] = useSelectedBid();

  const [ _ignore_me_, setNewBooking ] = useNewBooking();
  const [ create, { loading, validationErrors }] = useCreateBooking();

  const booking = emptyBooking();

  const onSubmit = args => {
    const { title, firstName, lastName, time, partySize, seated, cancelled, notes } = args;
    create({ title, firstName, lastName, time, partySize, seated, cancelled, date, notes })
      .then(result => setSelectedBid(result?.data?.newBooking?._id));
  };

  const onCancel = () => setNewBooking(false);


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
      newBooking
    />
  // <BookingForm
  //   onSubmit={onSubmit}
  // />
  );

};

export default NewBookingView;
