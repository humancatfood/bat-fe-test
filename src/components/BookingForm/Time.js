import React from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Schedule from '@material-ui/icons/Schedule';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';



function Time ({ booking = {}, onChange: onChangeProp, date /* loading, errors */ }) {
  const { time } = booking;

  // TODO: clean this up
  const value= moment(`${date}T${time.replace('.', ':')}`);
  const onChange=m => onChangeProp('time', m.format('HH:mm'));

  const dense = useMediaQuery('(max-width:480px)');

  return (
    <>
      <Schedule />
      <Box flex={3} ml={dense ? 1 : 3}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardTimePicker
            autoOk
            required
            value={value}
            onChange={onChange}
            ampm={false}
            variant="inline"
          />
        </MuiPickersUtilsProvider>
      </Box>
    </>
  );

}

Time.propTypes = {
  date: PropTypes.string.isRequired,
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
  loading: PropTypes.bool,
  errors: PropTypes.array,    //TODO: define error-shape
};


export default Time;
