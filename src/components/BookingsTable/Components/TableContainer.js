import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import MuiTableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
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

const TableContainer = forwardRef(({shadow, ...props}, ref) => {
  const { root } = useStyles(shadow);
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


export default TableContainer;
