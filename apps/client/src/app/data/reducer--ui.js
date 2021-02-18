import { ACTIONS } from './actions';



export const uiDefaultState = {
  sortProp: 'time',
  sortOrder: 1,
};

export default (state=uiDefaultState, action) => {

  switch (action.type)
  {

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
