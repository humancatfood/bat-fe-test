import DataStore from 'nedb';

import initialData from '../assets/bookings.json';



export const createDB = (filename = '.data/datafile', shouldAddFixtures) => {
  const db = new DataStore({ filename, autoload: true });

  if (shouldAddFixtures) {
    addFixtures(db);
  }

  db.ensureIndex({
    fieldName: 'date',
  });

  return db;
};

function addFixtures(db) {
  db.count({}, (err, count) => {
    if (err) {
      global.console.error("There's a problem with the database: ", err);
    } else if (!count) {

      const data = initialData.flatMap(({ date, bookings }) => bookings.map((booking) => ({
        ...booking,
        date,
        name: `${booking.title} ${booking.firstName} ${booking.lastName}`,
      })));

      db.insert(data, (err, result) => {
        if (err) {
          global.console.error("There's a problem with the database: ", err);
        } else if (result) {
          global.console.info('Default bookings inserted in the database');
        }
      });
    }
  });
}
