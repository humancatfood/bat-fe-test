import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import Divider from '@material-ui/core/Divider';

import BookingForm from '../../components/BookingForm';
import * as Dialog from './Dialog';



const BookingFormDialog = props => {

  const {
    title,
    booking: defaultBooking,
    isLoading,
    errors = [],
    onSubmit,
    onCancel,
    date,
    newBooking,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    resetLabel = 'Reset',
  } = props;

  const [booking, setBooking] = useState(defaultBooking);

  useEffect(() => {
    setBooking(defaultBooking);
  }, [ defaultBooking ]);

  const hasChanged = !isEqual(booking, defaultBooking);

  const reset = () => setBooking(defaultBooking);

  const update = (key, value) => setBooking(booking => ({
    ...booking,
    [key]: value,
  }));

  const submit = e => {
    e.preventDefault();
    onSubmit(booking);
  };

  return (
    <Dialog.Container
      title={title}
      onClose={onCancel}
      component='form'
    >
      <>
        <Divider />
        <Dialog.Body>
          {
            booking && (
              <BookingForm
                booking={booking}
                onChange={update}
                isDirty={!hasChanged}
                isLoading={isLoading}
                errors={errors}
                date={date}
                newBooking={newBooking}
              />
            )
          }
        </Dialog.Body>
        <Dialog.Actions>
          <Dialog.ResetButton
            onClick={reset}
            style={{ marginRight: 'auto' }}
            disabled={!hasChanged}
          >
            {
              resetLabel
            }
          </Dialog.ResetButton>
          <Dialog.CancelButton onClick={onCancel}>
            {
              cancelLabel
            }
          </Dialog.CancelButton>
          <Dialog.SubmitButton
            onClick={submit}
            disabled={!hasChanged}
          >
            {
              submitLabel
            }
          </Dialog.SubmitButton>
        </Dialog.Actions>
      </>
    </Dialog.Container>
  );
};


BookingFormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  booking: PropTypes.object, // TODO: define booking-shape
  isLoading: PropTypes.bool,
  errors: PropTypes.array, // TODO: define error-shape
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  resetLabel: PropTypes.string,
  date: PropTypes.string.isRequired,
  newBooking: PropTypes.bool,
};

export default BookingFormDialog;
