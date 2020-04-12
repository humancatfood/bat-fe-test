import React, { useRef, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import EventIcon from '@material-ui/icons/Event';
import ArrowLeftIcon from '@material-ui/icons/ArrowBackIos';
import ArrowRightIcon from '@material-ui/icons/ArrowForwardIos';

import { useSelectedDate } from 'data';

import DatePicker from 'components/DatePicker';



const calendarId = 'calendar-id';

const Header = () => {

  const ref = useRef();
  const [ isDatePickerOpen, setDatePickerOpen ] = useState(false);

  const [ selectedDate, setSelectedDate ] = useSelectedDate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="go one day back"
          onClick={() => setSelectedDate(-1)}
          color="inherit"
        >
          <ArrowLeftIcon />
        </IconButton>
        <Typography variant="h6">
          {
            selectedDate.calendar()
          }
        </Typography>
        <IconButton
          aria-label="open date-picker"
          aria-controls={calendarId}
          aria-haspopup="true"
          onClick={() => setDatePickerOpen(open => !open)}
          color="inherit"
          ref={ref}
        >
          <EventIcon />
        </IconButton>
        <IconButton
          aria-label="go one day forward"
          onClick={() => setSelectedDate(1)}
          color="inherit"
        >
          <ArrowRightIcon />
        </IconButton>
        <Popover
          id={calendarId}
          open={isDatePickerOpen}
          anchorEl={ref.current}
          onClose={() => setDatePickerOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <DatePicker
            value={selectedDate}
            onChange={date => {
              setSelectedDate(date);
              setDatePickerOpen(false);
            }}
          />
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
