import React from 'react';
import { connect } from 'react-redux';

import { selectBooking } from './../data/actions';

import BookingForm from './BookingForm';



class BookingDetailView extends React.Component
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

const mapStateToProps = state => ({
  booking: state.bookings.byId[state.ui.selectedBookingId],
});

const mapDispatchToProps = {
  selectBooking,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailView);
