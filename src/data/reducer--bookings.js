import { ACTIONS } from './actions';



export const bookingsDefaultState = {
  byId: {},
  byDate: {},
};

export default (state=bookingsDefaultState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_BOOKINGS: {
      const { bookings, date } = action.payload;
      return {
        ...state,
        byDate: {
          [date]: bookings.map(booking => booking._id),
        },
        byId: {
          ...state.byId,
          ...bookings.reduce((result, booking) => {
            result[booking._id] = booking;
            return result;
          }, {}),
        },
      };
    }

    case ACTIONS.UPDATE_BOOKING: {
      const { booking } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [booking._id]: booking,
        },
      };
    }

    default:
      return state;

  }

};
