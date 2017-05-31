import { ACTIONS } from './actions';



export const uiDefaultState = {
  selectedDate: undefined,
  selectedId: undefined
};

export default (state=uiDefaultState, action) => {

  switch (action.type)
  {

    case ACTIONS.SELECT_DATE:
      return {
        ...state,
        selectedDate: action.payload.date
      };

    default:
      return state;

  }

};
