const DataStore = require('nedb');



module.exports = ( filename='.data/datafile') => {

  const db = new DataStore({ filename, autoload: true });

  addFixtures(db);

  db.ensureIndex({
    fieldName: 'date',
  });

  return db;

};


function addFixtures (db) {

  db.count({}, function (err, count) {
    if(err) {
      console.error("There's a problem with the database: ", err);
    } else if (!count) {

      const initialData = require('./../bookings.json').flatMap(({ date, bookings }) => bookings.map(booking => ({
        ...booking,
        date,
        name: `${booking.title} ${booking.firstName} ${booking.lastName}`,
      })));

      console.info('initialData:', initialData);

      db.insert(initialData, (err, result) => {
        console.info('after insert:', err, result);
        if (err) {
          console.error("There's a problem with the database: ", err);
        } else if (result) {
          console.info("Default bookings inserted in the database");
        }
      });
    }
  });

}
