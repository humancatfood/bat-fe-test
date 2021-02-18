import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import MuiDivider from '@material-ui/core/Divider';



export const Wrapper = ({ dense, ...props }) => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    paddingTop={dense ? 1 : 2}
    justifyContent="space-between"
    {...props}
  />
);

Wrapper.propTypes = {
  dense: PropTypes.bool,
};


export const FormRow = ({ dense, ...props }) => (
  <Box
    flex={1}
    mb={dense ? 2 : 4}
    display="flex"
    alignItems="center"
    {...props}
  />
);

FormRow.propTypes = {
  dense: PropTypes.bool,
};


export const Spacer = Box;


export const Divider = ({ dense, ...props}) => (
  <Box
    mx={dense ? 1 : 3}
    height="auto"
    alignSelf="stretch"
    display="flex"
    justifyContent="center"
  >
    <MuiDivider orientation="vertical" {...props} />
  </Box>
);

Divider.propTypes = {
  dense: PropTypes.bool,
};
