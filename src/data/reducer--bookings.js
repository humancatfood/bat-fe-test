import { ACTIONS } from './actions';



export const bookingsDefaultState = {
  byId: {},
  byDate: {}
};

export default (state=bookingsDefaultState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_BOOKINGS:
      return {
        ...state,
        byDate: {
          [action.payload.date]: action.payload.bookings
        }
      };

    default:
      return state;

  }

};
