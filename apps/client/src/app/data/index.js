import { useHistory, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

import { useQuery, useMutation } from '@apollo/react-hooks';

import * as queries from './queries';

export { queries };

export { default as Provider } from './Provider';



const getValidationErrorsFromStatus = status => (status?.error?.graphQLErrors || []).flatMap(error => error.validationErrors);

// TODO: factor these hooks into modules

export const useDailyBookings = date => {
  const result = useQuery(
    queries.getDailyBookings,
    { variables: {
      date: date.format('YYYY-MM-DD'),
    } },
  );
  return {
    ...result,
    bookings: result?.data?.bookings,
  };
};


export const useBookingById = _id => {
  const result = useQuery(
    queries.getBookingById,
    { variables: { _id } },
  );
  return {
    ...result,
    booking: result?.data?.booking,
  };
};


export const useCreateBooking = () => {

  const [create, status] = useMutation(queries.newBooking, {
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
    }).catch(console.error.bind(null, 'error:')),
    {
      ...status,
      validationErrors: getValidationErrorsFromStatus(status),
    },
  ];

};


export const useUpdateBooking = () => {

  const [update, status] = useMutation(queries.updateBooking);

  return [
    (_id, booking) => update({
      variables: {
        _id, booking,
      },
    }).catch(console.error.bind(null, 'error:')),
    {
      ...status,
      booking: status?.data?.booking,
    },
  ];

};


export const useSelectedDate = () => {
  const { date: rawDate } = useParams();
  const date = moment(rawDate);
  const history = useHistory();
  return [
    date,
    arg => {
      if (moment.isMoment(arg)) {
        history.push(`/${arg.format('YYYY-MM-DD')}`);
      } else if (arg === 1) {
        history.push(`/${date.add(1, 'day').format('YYYY-MM-DD')}`);
      } else if (arg === -1) {
        history.push(`/${date.subtract(1, 'day').format('YYYY-MM-DD')}`);
      }
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
