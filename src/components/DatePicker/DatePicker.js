import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker as MUIDatePicker  } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils, {} from '@date-io/moment';

import moment, { duration } from 'moment';

import { formatLabel } from './utils';



const DatePicker = ({ value, onChange }) => {

  const [ now, setNow ] = useState(moment());

  useEffect(() => {
    const eod = now.clone().endOf('day');
    const timeUntilEndOfDay = duration(eod - now).asMilliseconds();
    setTimeout(() => {
      setNow(moment());
    }, timeUntilEndOfDay);
  }, [ now ]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MUIDatePicker
        key={now}
        variant="static"
        onChange={onChange}
        value={value}
        labelFunc={formatLabel}
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  value: PropTypes.instanceOf(moment).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
