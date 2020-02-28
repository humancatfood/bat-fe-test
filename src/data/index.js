import { useQuery } from '@apollo/react-hooks';

import { useHistory, useLocation } from '../components/Routing';
import queries from './queries';

export { default as Provider } from './Provider';



export const hooks = {
  useBookings: day => useQuery(
    queries.getBookings,
    { variables: { day } },
  ),
};






export const useBookingSelector = () => {

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  const bid = params.get('bid');
  return [
    bid,
    bid => {
      if (bid) {
        params.set('bid', bid);
      } else {
        params.delete('bid');
      }
      location.search = params.toString();
      history.push(location);
    },
  ];

};
