import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import MuiTableContainer from '@material-ui/core/TableContainer';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import { styled, makeStyles } from '@material-ui/styles';

export { default as TableHead } from '@material-ui/core/TableHead';
export { default as TableRow } from '@material-ui/core/TableRow';
export { default as TableCell } from '@material-ui/core/TableCell';


export {default as ColumnHeader} from './ColumnHeader';


const useStyles = makeStyles(theme => ({
  container: {
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

  body: {
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



export const TableContainer = forwardRef(({shadow, ...props}, ref) => (
  <MuiTableContainer
    ref={ref}
    className={useStyles(shadow).container}
    {...props}
  />
));

TableContainer.displayName = 'TableContainer';
TableContainer.propTypes = {
  shadow: PropTypes.bool.isRequired,
};



export const Table = styled(MuiTable)({
  tableLayout: 'fixed',
});



export const TableBody = ({ shadow, ...props }) => (
  <MuiTableBody
    className={useStyles(shadow).body}
    {...props}
  />
);
TableBody.propTypes = {
  shadow: PropTypes.bool.isRequired,
};
