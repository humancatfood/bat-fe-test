import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


const Error = ({ onClose, severity='error', children }) => (
  <Snackbar open autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity}>{children}</Alert>
  </Snackbar>
);

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  severity: PropTypes.string,
};

export default Error;
