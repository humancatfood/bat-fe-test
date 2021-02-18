import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { styled, makeStyles } from '@material-ui/core/styles';
import MuiCheckbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const Checkbox = styled(props => <MuiCheckbox {...omit(props, 'color')} />)(({theme, color}) => ({
  '&.Mui-checked': {
    color: theme.palette[color].main,
    '&.Mui-disabled': {
      color: theme.palette[color].light,
    },
  },
  '&.Mui-disabled': {
    opacity: 0.4,
  },
}));


const useStyles = makeStyles({
  lastLabel: {
    marginRight: 0,
  },
});

function Status ({ booking = {}, onChange: onChangeProp, newBooking /* loading, errors */ }) {

  const { seated, cancelled } = booking;
  const isSeatedDisabled = cancelled || newBooking;

  const onChange = event => onChangeProp(event.target.name, event.target.checked);

  const classes = useStyles();

  return (
    <FormGroup
      row
      label="Booking Status"
    >
      <FormControlLabel
        disabled={isSeatedDisabled}
        onChange={onChange}
        checked={seated}
        name="seated"
        control={<Checkbox color="success" />}
        label="Seated"
      />
      <FormControlLabel
        disabled={newBooking}
        onChange={onChange}
        checked={cancelled}
        name="cancelled"
        control={<Checkbox color="error"  />}
        label="Cancelled"
        className={classes.lastLabel}
      />
    </FormGroup>
  );

}

Status.propTypes = {
  errors: PropTypes.array,    //TODO: define error-shape
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
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
  newBooking: PropTypes.bool,
};


export default Status;
