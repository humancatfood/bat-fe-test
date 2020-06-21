import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import * as Components from './Components';



const getColumns = isHead => ([{
  key: 'name',
  variant: isHead ? 'head' : 'body',
  label: 'Name',
  ...(!isHead && {
    accessor: booking => `${ booking.title } ${ booking.firstName } ${ booking.lastName }`,
  }),
}, {
  key: 'time',
  variant: isHead ? 'head' : 'body',
  label: 'Time',
  align: 'right',
  ...(isHead ? {
    sortValue: 'time',
  } : {
    accessor: booking => booking.time,
  }),

}, {
  key: 'covers',
  variant: isHead ? 'head' : 'body',
  label: 'Covers',
  align: 'right',
  ...(isHead ? {
    sortValue: 'time',
  } : {
    accessor: booking => booking.partySize,
  }),
}, {
  key: 'seated',
  variant: isHead ? 'head' : 'body',
  label: 'Seated',
  padding: 'checkbox',
  align: 'center',
  ...(isHead ? {
    sortValue: 'seated',
  } : {
    accessor: booking => booking.seated && <Components.CheckIcon />,
  }),
}, {
  key: 'cancelled',
  variant: isHead ? 'head' : 'body',
  label: 'Cancelled',
  align: 'center',
  padding: 'checkbox',
  ...(isHead ? {
    sortValue: 'cancelled',
  } : {
    accessor: booking => booking.cancelled && <Components.ClearIcon />,
  }),
}]);


const BookingsTable = ({ bookings, selectedId, selectId }) => {

  const ref = useRef();
  const { sortProp, sortOrder } = useSelector(state => state?.ui);
  const [ shadows, setShadows ] = useState([false, false]);
  const headerColumns = useMemo(() => getColumns(true), []);
  const bodyColumns = useMemo(() => getColumns(false), []);
  const isDense = useMediaQuery('(max-width: 680px)');

  useEffect(() => {
    if (ref.current) {
      setShadows(calcShadows(ref.current));
    }
  }, [ setShadows ]);

  const content = bookings.length ?
    bookings
      .sort(sortBookings(bookings, sortProp, sortOrder))
      .map(booking => renderBooking(booking, selectedId, selectId, bodyColumns))
    : (
      <Components.EmptyView />
    );

  return (
    <Components.TableContainer
      ref={ref}
      onScroll={e => setShadows(calcShadows(e.target))}
      shadow={shadows[1]}
    >
      <Components.Table
        stickyHeader
        aria-label="Bookings Table"
        size={isDense ? 'small' : 'medium'}
      >
        <Components.TableHead>
          <Components.TableRow>
            {
              headerColumns.map(({key, ...props}) => (
                <Components.ColumnHeader key={key} {...props} />
              ))
            }
          </Components.TableRow>
        </Components.TableHead>
        <Components.TableBody shadow={shadows[0]} isDense={isDense}>
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


export default BookingsTable;


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


function renderBooking (booking, selectedId, selectId, columns) {
  return (
    <Components.TableRow
      key={booking._id}
      isSelected={selectedId === booking._id}
      isSeated={booking.seated}
      isCancelled={booking.cancelled}
      onClick={() => selectId(booking._id)}
    >
      {
        columns.map(({key, accessor, ...props}) => (
          <Components.TableCell key={key} {...props}>
            {
              accessor(booking)
            }
          </Components.TableCell>
        ))
      }
    </Components.TableRow>
  );
}
