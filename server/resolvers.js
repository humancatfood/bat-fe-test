const bookings = []; //TODO: get bookings from DB
const CHANNEL = 'CHANNEL';


module.exports = {
  Query: {
    bookings: (parent, { day }, { db }) => new Promise((resolve, reject) => {

      db.find({ date: day }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });

    }),
    booking: (parent, { _id }, { db }) => new Promise((resolve, reject) => {

      db.findOne({ _id }, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });

    }),
  },

  Mutation: {
    updateBooking: (root, { _id, booking }, { db }) => new Promise((resolve, reject) => {

      db.update({ _id }, { $set: booking }, {returnUpdatedDocs: true}, (error, numUpdated, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });

    }),

    newBooking: (root, { booking }, { pubsub }) => {

      // TODO: implement this properly
      const { name, date, time, partySize, notes='' } = booking;

      const newBooking = {
        _id: bookings.length + 1,
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

  // TODO: implement subscriptions
  Subscription: {
    bookings: {
      subscribe: (root, args, { pubsub }) => {
        setTimeout(() => pubsub.publish(CHANNEL, { bookings }), 1);
        return pubsub.asyncIterator(CHANNEL);
      },
    },
  },
};
