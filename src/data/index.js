import { useQuery, useMutation } from '@apollo/react-hooks';

import { useHistory, useLocation } from '../components/Routing';
import * as queries from './queries';

export { default as Provider } from './Provider';



// TODO: factor these hooks into modules

export const useDailyBookings = date => {
  const { data, loading, error } = useQuery(
    queries.getDailyBookings,
    { variables: { date } },
  );
  return {
    error,
    loading,
    bookings: data && data.bookings,
  };
};


export const useBookingById = _id => {
  const { data, loading, error } = useQuery(
    queries.getBookingById,
    { variables: { _id } },
  );
  return {
    error,
    loading,
    booking: data && data.booking,
  };
};


export const useUpdateBooking = () => {

  const [update, { data, loading, error, ...rest }] = useMutation(queries.updateBooking);

  console.log('update:', data, loading, error, rest);
  console.log(error);

  return [
    (_id, booking) => update({
      variables: {
        _id, booking,
      },
    }),
    {
      error,
      loading,
      booking: data && data.booking,
    },
  ];

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
