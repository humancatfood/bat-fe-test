import { getBookingsForDate, saveBooking } from './bookings-service';


export const ACTIONS = {
  SET_BUSY: 'SET_BUSY',
  SORT_BY: 'SORT_BY',

  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  RECEIVE_BOOKINGS: 'RECEIVE_BOOKINGS',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
};


export const setBusy = busy => () => ({
  type: ACTIONS.SET_BUSY,
  payload: {
    busy,
  },
});


export const receiveBookings = (date, bookings) => ({
  type: ACTIONS.RECEIVE_BOOKINGS,
  payload: {
    date,
    bookings,
  },
});


export const sortBy = sortProp => ({
  type: ACTIONS.SORT_BY,
  payload: {
    sortProp,
  },
});


export const updateBooking = newBooking => async dispatch => {

  dispatch(setBusy(true));

  try
  {
    const booking = await saveBooking(newBooking);
    dispatch({
      type: ACTIONS.UPDATE_BOOKING,
      payload: {
        booking,
      },
    });
  }
  catch (e)
  {
    console.error(e);
  }
  dispatch(setBusy(false));

};


export const selectDate = date => async dispatch => {

  dispatch(setBusy(true));

  try {
    const bookings = await getBookingsForDate(date);
    if (bookings)
    {
      dispatch(receiveBookings(date, bookings.bookings));
    }
    else
    {
      dispatch(receiveBookings(date, []));
    }
  }
  catch (e) {
    console.error(e);
  }
  dispatch(setBusy(false));

};
