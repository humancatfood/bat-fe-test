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


export const useCreateBooking = () => {

  const [create, { data, loading, error }] = useMutation(queries.newBooking, {
    update: (cache, { data: { newBooking } }) => {
      const { bookings } = cache.readQuery({ query: queries.getDailyBookings,
        variables: {
          date: newBooking.date,
        },
      });
      cache.writeQuery({
        query: queries.getDailyBookings,
        variables: { date: newBooking.date },
        data: { bookings: bookings.concat(newBooking) },
      });
    },
  });

  return [
    booking => create({
      variables: {
        booking,
      },
    }),
    {
      error,
      loading,
      booking: data && data.booking,
    },
  ];

};


export const useUpdateBooking = () => {

  const [update, { data, loading, error }] = useMutation(queries.updateBooking);

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


export const useURLParameter = (key, { replaces }={}) => {

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  const parameter = params.get(key);
  return [
    parameter === '' ? true : parameter,
    parameter => {
      if (parameter) {
        params.set(key, parameter === true ? '' : parameter);
        params.delete(replaces);
      } else {
        params.delete(key);
      }
      location.search = params.toString();
      history.push(location);
    },
  ];
};

export const useSelectedBid = () => useURLParameter('bid', { replaces: 'new' });

export const useNewBooking = () => useURLParameter('new', { replaces: 'bid' });
