import React from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles  } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';


// TODO: make these discoverable via the api

const min = 1;
const max = 15;

const marks = [{
  value: 1,
  label: 1,
}, {
  value: 5,
  label: 5,
}, {
  value: 10,
  label: 10,
}, {
  value: 15,
  label: 15,
}];


const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingTop: theme.spacing(4),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  sliderDense: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));


function PartySize({ booking, onChange: onChangeProp /* loading, errors */ }) {

  const handleSliderChange = (event, newValue) => {
    onChangeProp('partySize', newValue);
  };

  const dense = useMediaQuery('(max-width:480px)');

  const classes = useStyles();

  return (
    <FormControl className={classes.wrapper}>
      <Person />
      <Slider
        marks={marks}
        min={min}
        max={max}
        value={Number(booking?.partySize)}
        onChange={handleSliderChange}
        aria-label="Party Size"
        valueLabelDisplay="on"
        className={dense ? classes.sliderDense : classes.slider}
      />
      <Group />
    </FormControl>
  );
}

PartySize.propTypes = {
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
  errors: PropTypes.array,    //TODO: define error-shape
  loading: PropTypes.bool,
};


export default PartySize;
