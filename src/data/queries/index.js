import { gql } from 'apollo-boost';

/* eslint-disable import/no-webpack-loader-syntax */
import getDailyBookings from '!!raw-loader!./getDailyBookings.gql';
import getBookingById from '!!raw-loader!./getBookingById.gql';
import updateBooking from '!!raw-loader!./updateBooking.gql';
/* eslint-enable import/no-webpack-loader-syntax */



const queries = {
  getDailyBookings: gql(getDailyBookings),
  getBookingById: gql(getBookingById),
  updateBooking: gql(updateBooking),
};


export default queries;
