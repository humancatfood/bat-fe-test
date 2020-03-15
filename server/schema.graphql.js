const { gql } = require('apollo-boost');

module.exports = gql`

  type Booking {
    _id: ID

    # TODO: combine this into a single 'name' field
    title: String!
    firstName: String!
    lastName: String!

    # TODO: combine date and time into a single field with some custom type 'Date' or something
    date: String!
    time: String!
    partySize: Int!
    seated: Boolean
    cancelled: Boolean
    notes: String
  }

  input BookingInput {
    title: String!
    firstName: String!
    lastName: String!
    date: String!
    time: String!
    partySize: Int!
    notes: String
    seated: Boolean
    cancelled: Boolean
  }

  type Query {
    bookings(date: String!): [Booking!]
    booking(_id: ID!): Booking
  }

  type Mutation {
    newBooking(booking: BookingInput!): Booking
    updateBooking(_id: ID!, booking: BookingInput!): Booking
  }

  type Subscription {
    bookings(date: String!): [Booking]
  }

`;
