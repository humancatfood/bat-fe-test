import { useQuery } from '@apollo/react-hooks';

import queries from './queries';

export { default as Provider } from './Provider';



export const hooks = {
  useBookings: day => useQuery(
    queries.getBookings,
    { variables: { day } },
  ),
};
