import { gql } from '@apollo/client';



export default gql`
  query getDailyBookings($date: String!) {
    bookings(date: $date) {
      _id
      title
      firstName
      lastName
      time
      partySize
      seated
      cancelled
    }
  }
`;
