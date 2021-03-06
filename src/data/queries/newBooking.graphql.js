import { gql } from 'apollo-boost';



export default gql`
  mutation newBooking($booking: BookingInput!) {
    newBooking(booking: $booking) {
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
