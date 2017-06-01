import React from 'react';
import { connect } from 'react-redux';

import { selectBooking } from './../data/actions';

import DateSelector from './DateSelector';
import BookingsTable from './BookingsTable';



@connect(store => {
  const { bookings: {byId={}, byDate={}}, ui: {selectedDate=null}} = store;
  const ids = byDate[selectedDate];
  return {
    bookings: ids && ids.map(id => byId[id]),
    selectedBooking: store.ui.selectedBooking
  };
}, {
  selectBooking
})
export default class BookingsTableView extends React.Component
{
  render ()
  {
    const { bookings, selectedBooking, selectBooking } = this.props;

    return (
      <section>
        <label htmlFor="">
          <h2 className="bui-app-intro">Bookings for <DateSelector /></h2>
        </label>
        {
          bookings &&
            <BookingsTable bookings={ bookings}
                           selectedBooking={ selectedBooking }
                           onSelectBooking={ booking => selectBooking(booking) } />
        }
        {
          !bookings &&
            <div>
              <p>Sorry, no bookings available for the selected day</p>
            </div>
        }
      </section>
    );
  }
}
