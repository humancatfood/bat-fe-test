import React from 'react';
import PropTypes from 'prop-types';

import MuiTableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles({
  root: {
    textDecoration: isCancelled => isCancelled ? 'line-through' : 'none',
  },
});


function TableCell ({isCancelled, ...otherProps}) {
  const classes = useStyles(isCancelled);
  return (
    <MuiTableCell
      classes={classes}
      {...otherProps}
    />
  );
}

TableCell.propTypes = {
  isCancelled: PropTypes.bool,
};

export default TableCell;
