const yup = require('yup');



const bookings = []; //TODO: get bookings from DB
const CHANNEL = 'CHANNEL';

const dateInputSchema = yup.string().matches(/^\d\d\d\d-\d\d-\d\d$/);

const bookingInputSchema = yup.object().shape({
  title: yup.string().required().oneOf(['Mr', 'Ms', 'Miss', 'Mrs']),
  firstName: yup.string().trim().max(20).required(),
  lastName: yup.string().trim().max(20).required(),
  date: dateInputSchema.required(),
  time: yup.string().required().matches(/^\d\d(:|.)\d\d$/),
  partySize: yup.number().required(),
  notes: yup.string().trim().notRequired().max(140).ensure(),
  seated: yup.boolean().notRequired().default(false),
  cancelled: yup.boolean().notRequired().default(false),
});

const idInputSchema = yup.string().required();



module.exports = {
  Query: {
    bookings: (parent, { date }, { db }) => new Promise((resolve, reject) => {

      dateInputSchema.validate(date)
        .then(date => {
          db.find({ date }, (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        })
        .catch(reject);

    }),
    booking: (parent, { _id }, { db }) => new Promise((resolve, reject) => {

      idInputSchema.validate(_id)
        .then(_id => {
          db.findOne({ _id }, (error, data) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        })
        .catch(reject);

    }),
  },

  Mutation: {
    updateBooking: (root, { _id, booking }, { db }) => new Promise((resolve, reject) => {

      bookingInputSchema.validate(booking, { abortEarly: false })
        .then(booking => {
          return idInputSchema.validate(_id)
            .then(_id => {
              db.update(
                { _id },
                { $set: booking },
                {returnUpdatedDocs: true},
                (error, numUpdated, data) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(data);
                  }
                });
            });
        })
        .catch(reject);

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
