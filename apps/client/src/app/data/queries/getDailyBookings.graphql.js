import { gql } from 'apollo-boost';



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
