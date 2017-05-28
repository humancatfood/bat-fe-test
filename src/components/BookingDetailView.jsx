import React from 'react';



export default ({ booking, onClose }) => {

  const seated = booking.cancelled ?
    'cancelled' :
    booking.seated ?
      'yes' :
      'no';

  return (
    <section className="bookings-detail-view">
      <h2 className="bui-app-intro">
        Booking update:
        <button onClick={ () => onClose() } style={{float: 'right'}}>X</button>
      </h2>

      <form>
        <fieldset>
          <legend>Name</legend>
          <input type="text" name="name" value={ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }/>
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
};
