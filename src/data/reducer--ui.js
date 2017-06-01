import { ACTIONS } from './actions';



export const uiDefaultState = {
  selectedDate: undefined,
  selectedBookingId: undefined
};

export default (state=uiDefaultState, action) => {

  switch (action.type)
  {

    case ACTIONS.SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload.date
      };

    case ACTIONS.SELECT_BOOKING:
      return {
        ...state,
        selectedBookingId: action.payload.booking && action.payload.booking.id
      };

    default:
      return state;

  }

};
