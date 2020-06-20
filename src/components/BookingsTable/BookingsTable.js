import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { sortBy } from '../../data/actions';

import * as Components from './Components';



const BookingsTable = ({ bookings, sortProp, sortOrder, selectedId, selectId }) => {

  const ref = useRef();
  const [ shadows, setShadows ] = useState([false, false]);
  useEffect(() => {
    if (ref.current) {
      setShadows(calcShadows(ref.current));
    }
  }, [ setShadows ]);

  const content = bookings.length ?
    bookings
      .sort(sortBookings(bookings, sortProp, sortOrder))
      .map(booking => renderBooking(booking, selectedId, selectId))
    : (
      <Components.EmptyView />
    );


  return (
    <Components.TableContainer
      ref={ref}
      onScroll={e => setShadows(calcShadows(e.target))}
      shadow={shadows[1]}
    >
      <Components.Table aria-label="Bookings Table" stickyHeader>
        <Components.TableHead>
          <Components.TableRow>
            <Components.ColumnHeader label="Name" />
            <Components.ColumnHeader sortValue="time" label="Time" />
            <Components.ColumnHeader sortValue="partySize" label="Covers" />
            <Components.ColumnHeader sortValue="seated" label="Seated" />
          </Components.TableRow>
        </Components.TableHead>
        <Components.TableBody shadow={shadows[0]}>
          {
            content
          }
        </Components.TableBody>
      </Components.Table>
    </Components.TableContainer>
  );
};

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



function sortBookings (bookings, sortProp, sortOrder) {
  return (a, b) => {
    const va = a[sortProp];
    const vb = b[sortProp];
    if (va > vb) {
      return 1 * sortOrder;
    } else if (va < vb) {
      return -1 * sortOrder;
    } else {
      return 0;
    }
  };
}



function calcShadows (element) {
  return [
    element.scrollTop > 0,
    (element.scrollTop + element.offsetHeight) < element.scrollHeight,
  ];
}


function renderBooking ( booking, selectedId, selectId) {
  return (
    <Components.TableRow
      hover
      selected={selectedId === booking._id}
      key={ booking._id }
      className={ classnames({    //TODO: use proper mui styling strategies here
        seated: booking.seated,
        cancelled: booking.cancelled,
      }) }
      onClick={ () => selectId(booking._id) }
    >
      <Components.TableCell>{ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }</Components.TableCell>
      <Components.TableCell>{ booking.time }</Components.TableCell>
      <Components.TableCell>{ booking.partySize }</Components.TableCell>
      <Components.TableCell>{ booking.seated ? 'Y' : 'N' }</Components.TableCell>
    </Components.TableRow>
  );
}


const mapStateToProps = ({ ui: {sortProp, sortOrder}}) => ({
  sortProp,
  sortOrder,
});


const mapDispatchToProps = {
  sortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsTable);
