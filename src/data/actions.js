import { getLatestBookings, saveBooking } from './bookings-service';


export const ACTIONS = {
  SELECT_DATE: 'SELECT_DATE',
  SELECT_BOOKING: 'SELECT_BOOKING',

  SET_BUSY: 'SET_BUSY',

  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  RECEIVE_BOOKINGS: 'RECEIVE_BOOKINGS',
  UPDATE_BOOKING: 'UPDATE_BOOKING'
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


export const setBusy = busy => ({
  type: ACTIONS.SET_BUSY,
  payload: {
    busy
  }
});


export const receiveBookings = (date, bookings) => ({
  type: ACTIONS.RECEIVE_BOOKINGS,
  payload: {
    date,
    bookings
  }
});


export const loadLatestBookings = () => async dispatch => {
  dispatch(setBusy(true));

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
  dispatch(setBusy(false));

};


export const updateBooking = newBooking => async dispatch => {

  dispatch(setBusy(true));

  try
  {
    const booking = await saveBooking(newBooking);
    dispatch({
      type: ACTIONS.UPDATE_BOOKING,
      payload: {
        booking
      }
    });
  }
  catch (e)
  {
    console.error(e);
  }
  dispatch(setBusy(false));

};
