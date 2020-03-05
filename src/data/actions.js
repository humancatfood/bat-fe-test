export const ACTIONS = {
  SORT_BY: 'SORT_BY',
};



export const sortBy = sortProp => ({
  type: ACTIONS.SORT_BY,
  payload: {
    sortProp,
  },
});
