import { getLatestBookings } from './bookings-service';


export const ACTIONS = {
  SELECT_DATE: 'SELECT_DATE',
  SELECT_BOOKING: 'SELECT_BOOKING',

  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  RECEIVE_BOOKINGS: 'RECEIVE_BOOKINGS',
};



export const selectDate = date => ({
  type: ACTIONS.SELECT_DATE,
  payload: {
    date
  }
});


export const selectBooking = booking => ({
  type: ACTIONS.SELECT_BOOKING,
  payload: {
    booking
  }
});



export const loadBookings = () => ({
  type: ACTIONS.LOAD_BOOKINGS
});


export const receiveBookings = (date, bookings) => ({
  type: ACTIONS.RECEIVE_BOOKINGS,
  payload: {
    date,
    bookings
  }
});


export const loadLatestBookings = () => async dispatch => {
  dispatch(loadBookings());

  try
  {
    const {date, bookings}  = await getLatestBookings();
    dispatch(receiveBookings(date, bookings));
    dispatch(selectDate(date));
  }
  catch (e)
  {
    console.error(e);
  }

};
