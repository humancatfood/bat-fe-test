import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TableRaw from '@material-ui/core/Table';
import TableBodyRaw from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainerRaw from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { styled } from '@material-ui/styles';


import { connect } from 'react-redux';

import { sortBy } from '../../data/actions';

import ColumnHeader from './ColumnHeader';



const TableContainer = styled(TableContainerRaw)(({ shadows }) => ({
  height: '100%',
  overflow: 'auto',

  '&:after': {
    content: '""',
    height: 0,
    position: 'absolute',
    width: '100vw',
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, 10px)',
    boxShadow: '0px 0px 5px 1px black',

    transition: 'transform 200ms ease-in-out',

    ...(shadows[1] && {
      transform: 'translate(-50%, 1px)',
    }),
  },
}));

const Table = styled(TableRaw)({
  tableLayout: 'fixed',
});

const TableBody = styled(TableBodyRaw)(({ shadows }) => ({
  '&:before': {
    content: '""',
    height: 0,
    position: 'absolute',
    width: '100vw',
    left: '50%',
    transform: 'translate(-50%, -10px)',
    boxShadow: '0px 0px 5px 1px black',

    transition: 'transform 200ms ease-in-out',

    ...(shadows[0] && {
      transform: 'translate(-50%, 0px)',
    }),
  },
}));

const calcShadows = element => ([
  element.scrollTop > 0,
  element.scrollTop + element.offsetHeight < element.scrollHeight,
]);

const BookingsTable = ({ bookings, sortProp, sortOrder, selectedId, selectId }) => {

  const ref = useRef();
  const [ shadows, setShadows ] = useState([]);
  useEffect(() => {
    if (ref.current) {
      setShadows(calcShadows(ref.current));
    }
  }, [ setShadows ]);

  return (
    <TableContainer
      ref={ref}
      onScroll={e => setShadows(calcShadows(e.target))}
      shadows={shadows}
    >
      <Table aria-label="Bookings Table" stickyHeader>
        <TableHead>
          <TableRow>
            <ColumnHeader label="Name" />
            <ColumnHeader sortValue="time" label="Time" />
            <ColumnHeader sortValue="partySize" label="Covers" />
            <ColumnHeader sortValue="seated" label="Seated" />
          </TableRow>
        </TableHead>
        <TableBody shadows={shadows}>
          {
            sortBookings(bookings, sortProp, sortOrder).map(booking => (
              <TableRow
                key={ booking._id }
                className={ classnames({
                  seated: booking.seated,
                  cancelled: booking.cancelled,
                  selected: selectedId === booking._id,
                }) }
                onClick={ () => selectId(booking._id) }
              >
                <TableCell>{ `${ booking.title } ${ booking.firstName } ${ booking.lastName }` }</TableCell>
                <TableCell>{ booking.time }</TableCell>
                <TableCell>{ booking.partySize }</TableCell>
                <TableCell>{ booking.seated ? 'Y' : 'N' }</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function sortBookings (bookings, sortProp, sortOrder) {
  return bookings.sort((a, b) => {
    const va = a[sortProp];
    const vb = b[sortProp];
    if (va > vb) {
      return 1 * sortOrder;
    } else if (va < vb) {
      return -1 * sortOrder;
    } else {
      return 0;
    }
  });
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
