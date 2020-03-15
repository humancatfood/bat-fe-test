import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { sortBy } from './../data/actions';

import TableHeader from './BookingsTableHeader';



const BookingsTable = ({ bookings, sortProp, sortOrder, selectedId, selectId, className='' }) => (
  <table className={classnames('bookings-table', className)}>
    <thead>
      <tr>
        <TableHeader value="lastName" label="Name" />
        <TableHeader value="time" label="Time" />
        <TableHeader value="partySize" label="Covers" />
        <TableHeader value="seated" label="Seated" />
      </tr>
    </thead>
    <tbody>
      {
        sortBookings(bookings, sortProp, sortOrder).map(booking => (
          <tr key={ booking._id }
            className={ classnames({
              seated: booking.seated,
              cancelled: booking.cancelled,
              selected: selectedId === booking._id,
            }) }
            onClick={ () => selectId(booking._id) }>
            <td>{ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }</td>
            <td>{ booking.time }</td>
            <td>{ booking.partySize }</td>
            <td>{ booking.seated ? 'Y' : 'N' }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

function sortBookings (bookings, sortProp, sortOrder) {
  return bookings.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1 * sortOrder));
}

BookingsTable.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    partySize: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    seated: PropTypes.bool.isRequired,
    cancelled: PropTypes.bool.isRequired,
  })),
  sortProp: PropTypes.string,
  sortOrder: PropTypes.number,
  selectedId: PropTypes.string,
  selectId: PropTypes.func,
};



const mapStateToProps = ({ ui: {sortProp, sortOrder}}) => ({
  sortProp,
  sortOrder,
});


const mapDispatchToProps = {
  sortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTable);
