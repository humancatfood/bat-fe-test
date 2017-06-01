import React from 'react';
import { connect } from 'react-redux';

import { selectBooking } from './../data/actions';


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

    if (!booking)
    {
      return null;
    }

    const seated = booking.cancelled ?
      'cancelled' :
      booking.seated ?
        'yes' :
        'no';

    return (
      <section className="bookings-detail-view">
        <h2 className="bui-app-intro">
          Booking update:
          <button onClick={ () => selectBooking(undefined) } style={{float: 'right'}}>X</button>
        </h2>

        <form>
          <fieldset>
            <legend>Name</legend>
            <select name="title" onChange={console.log}>
              {
                ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'].map(title => (
                  <option key={ title } value="{ title }" checked={ title === booking.title}>{ title }</option>
                ))
              }
            </select>
            <input type="text" name="first-name" value={ booking.firstName } onChange={e => console.log(arguments)}/>
            <input type="text" name="title" value={ booking.lastName } onChange={e => console.log(arguments)}/>
          </fieldset>
          <fieldset>
            <legend>Time</legend>
            <input type="time" name="time" value={ booking.time } />
          </fieldset>
          <fieldset>
            <legend>Covers</legend>
            <input type="number" name="covers" value={ booking.partySize } />
          </fieldset>
          <fieldset>
            <legend>Seated</legend>
            <label><input type="radio" name="seated" value="no" checked={ seated === 'no'} />No</label>
            <label><input type="radio" name="seated" value="yes" checked={ seated === 'yes'} />Yes</label>
            <label><input type="radio" name="seated" value="cancelled" checked={ seated === 'cancelled'} />Cancelled</label>
          </fieldset>
          <fieldset>
            <legend>Notes</legend>
            <textarea name="notes" rows="4" value={ booking.notes }></textarea>
          </fieldset>
        </form>
      </section>
    );

  }
}
