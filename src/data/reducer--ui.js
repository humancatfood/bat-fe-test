import { ACTIONS } from './actions';



export const uiDefaultState = {
  selectedDate: undefined,
  selectedBookingId: undefined,
  sortProp: 'time',
  sortOrder: 1,
};

export default (state=uiDefaultState, action) => {

  switch (action.type)
  {

    case ACTIONS.SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload.date,
      };

    case ACTIONS.SELECT_BOOKING:
      return {
        ...state,
        selectedBookingId: action.payload.booking && action.payload.booking.id,
      };

    case ACTIONS.SORT_BY:
      return {
        ...state,
        sortProp: action.payload.sortProp,
        sortOrder: action.payload.sortProp === state.sortProp ? state.sortOrder * -1 : 1,
      };

    default:
      return state;

  }

};
