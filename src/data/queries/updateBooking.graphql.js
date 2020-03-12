import { gql } from 'apollo-boost';



export default gql`
  mutation updateBooking($_id: ID!, $booking: BookingInput!) {
    updateBooking(_id: $_id, booking: $booking) {
      _id
      title
      firstName
      lastName
      date
      time
      partySize
      notes
      seated
      cancelled
    }
  }
`;
