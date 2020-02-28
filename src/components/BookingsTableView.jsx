import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { selectDate } from '../data/actions';

import { useHistory } from './Routing';

import DateSelector from './DateSelector';
import BookingsTable from './BookingsTable';



const BookingsTableView = ({ hasBookings, date, selectDate }) => {

  const history = useHistory();

  useEffect(() => {
    selectDate(date);
  }, [ selectDate, date ]);

  return (
    <section className="table-view">
      <label className="table-view__header">
        <h2 className="bui-app-intro">Bookings for <DateSelector date={date} onChange={date => history.push(`/${date}`)} /></h2>
      </label>
      {
        hasBookings && (
          <BookingsTable className="table-view__body" date={date}/>
        )
      }
      {
        !hasBookings && (
          <div className="table-view__body">
            <p>Sorry, no bookings available for the selected day</p>
          </div>
        )
      }
    </section>
  );
};


const mapStateToProps = ({ bookings: {byDate}}, { date }) => ({
  hasBookings: !!(byDate && byDate[date] && byDate[date].length),
});

const mapDispatchToProps = {
  selectDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTableView);
