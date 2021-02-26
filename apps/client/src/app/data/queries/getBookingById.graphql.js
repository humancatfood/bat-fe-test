import { gql } from '@apollo/client';



export default gql`
  query getBookingById($_id: ID!) {
    booking(_id: $_id) {
      _id
      title
      firstName
      lastName
      time
      partySize
      seated
      cancelled
      notes
    }
  }
`;
