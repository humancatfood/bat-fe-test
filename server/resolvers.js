const bookings = []; //TODO: get bookings from DB
const CHANNEL = 'CHANNEL';


module.exports = {
  Query: {
    bookings: (/*root, args, context*/) => {
      return bookings;
    },
  },

  Mutation: {
    newBooking: (root, { booking }, { pubsub }) => {

      const { name, date, time, partySize, notes='' } = booking;

      const newBooking = {
        id: bookings.length + 1,
        name,
        date,
        time,
        partySize,
        seated: false,
        notes,
        cancelled: false,
      };

      bookings.push(newBooking);
      pubsub.publish(CHANNEL, { bookings });

      return newBooking;
    },
  },

  Subscription: {
    bookings: {
      subscribe: (root, args, { pubsub }) => {
        setTimeout(() => pubsub.publish(CHANNEL, { bookings }), 1);
        return pubsub.asyncIterator(CHANNEL);
      },
    },
  },
};
