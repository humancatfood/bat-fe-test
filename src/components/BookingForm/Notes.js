import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';




function Notes ({ booking = {}, onChange: onChangeProp /* loading, errors */ }) {

  const onChange = e => onChangeProp(e.target.name, e.target.value);

  return (
    <TextField
      fullWidth
      mx="auto"
      label="Notes"
      name="notes"
      multiline
      rows={4}
      variant="outlined"
      value={ booking.notes }
      onChange={ onChange }
      maxLength={250}
    />
  );

}

Notes.propTypes = {
  booking: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    time: PropTypes.string,
    partySize: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    status: PropTypes.string,
    notes: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  // loading: PropTypes.bool,
  // errors: PropTypes.array,    //TODO: define error-shape
};


export default Notes;
