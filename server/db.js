const Datastore = require('nedb');



module.exports = ( filename='.data/datafile') => {

  const db = new Datastore({ filename, autoload: true });

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

      const initialData = require('./bookings.json');
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
