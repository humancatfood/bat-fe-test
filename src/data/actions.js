import { getLatestBookings, getBookingsForDate, saveBooking } from './bookings-service';


export const ACTIONS = {
  SELECT_DATE: 'SELECT_DATE',
  SELECT_BOOKING: 'SELECT_BOOKING',

  SET_BUSY: 'SET_BUSY',
  SORT_BY: 'SORT_BY',

  LOAD_BOOKINGS: 'LOAD_BOOKINGS',
  RECEIVE_BOOKINGS: 'RECEIVE_BOOKINGS',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
};


export const selectBooking = booking => ({
  type: ACTIONS.SELECT_BOOKING,
  payload: {
    booking,
  },
});


export const setBusy = busy => ({
  type: ACTIONS.SET_BUSY,
  payload: {
    busy,
  },
});


export const setDate = date => ({
  type: ACTIONS.SELECT_DATE,
  payload: {
    date,
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


export const loadLatestBookings = () => async dispatch => {
  dispatch(setBusy(true));

  try
  {
    const { date, bookings } = await getLatestBookings();
    dispatch(receiveBookings(date, bookings));
    dispatch(setDate(date));
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
    dispatch(setDate(date));
  }
  catch (e) {
    console.error(e);
  }
  dispatch(setBusy(false));

};
