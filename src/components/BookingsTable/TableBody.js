import React from 'react';
import PropTypes from 'prop-types';

import MuiTableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';



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

const TableBody = ({ shadow, ...props }) => {
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

export default TableBody;
