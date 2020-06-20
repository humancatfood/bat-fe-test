import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import MuiTableContainer from '@material-ui/core/TableContainer';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import { styled, makeStyles } from '@material-ui/styles';

export { default as TableHead } from '@material-ui/core/TableHead';
export { default as TableRow } from '@material-ui/core/TableRow';
export { default as TableCell } from '@material-ui/core/TableCell';


export {default as ColumnHeader} from './ColumnHeader';


const useContainerStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'auto',

    '&:after': {
      content: '""',
      height: 10,
      position: 'absolute',
      width: '100vw',
      left: '50%',
      bottom: -10,
      // scaleY(-1) flips the element around so the shadow points *up*
      transform: shadow => `translate(-50%, ${shadow ? 1 : 10}px) scaleY(-1)`,
      boxShadow: theme.shadows[5],
      transition: 'transform 200ms ease-in-out',
    },
  },
}));

export const TableContainer = forwardRef(({shadow, ...props}, ref) => {
  const { root } = useContainerStyles(shadow);
  return (
    <MuiTableContainer
      ref={ref}
      classes={{root}}
      {...props}
    />
  );
});

TableContainer.displayName = 'TableContainer';
TableContainer.propTypes = {
  shadow: PropTypes.bool.isRequired,
};



export const Table = styled(MuiTable)({
  tableLayout: 'fixed',
});



const useBodyStyles = makeStyles(theme => ({
  root: {
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100vw',
      height: 10,
      top: 48,
      left: '50%',
      transform: shadow => `translate(-50%, ${shadow ? 0 : -10}px)`,
      boxShadow: theme.shadows[5],
      transition: 'transform 200ms ease-in-out',
    },
  },
}));

export const TableBody = ({ shadow, ...props }) => {
  const { root } = useBodyStyles(shadow);
  return (
    <MuiTableBody
      classes={{ root }}
      {...props}
    />
  );
};
TableBody.propTypes = {
  shadow: PropTypes.bool.isRequired,
};



const useEmptyStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 220,
  },
}));

export const EmptyView = () => {
  const { root } = useEmptyStyles();
  return (
    <Alert classes={{ root }} severity="info">
      <AlertTitle>No Bookings</AlertTitle>
      There are no bookings for this day
    </Alert>
  );
};
