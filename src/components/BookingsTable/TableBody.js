import React from 'react';
import PropTypes from 'prop-types';

import MuiTableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
  root: ([shadow, dense]) => ({
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100vw',
      height: 10,
      top: dense ? 28 : 48,
      left: '50%',
      transform: `translate(-50%, ${shadow ? 0 : -10}px)`,
      boxShadow: theme.shadows[5],
      transition: 'transform 200ms ease-in-out',
    },
  }),
}));

const TableBody = ({ shadow, isDense, ...props }) => {
  const { root } = useStyles([shadow, isDense]);
  return (
    <MuiTableBody
      classes={{ root }}
      {...props}
    />
  );
};
TableBody.propTypes = {
  shadow: PropTypes.bool,
  isDense: PropTypes.bool,
};

export default TableBody;
