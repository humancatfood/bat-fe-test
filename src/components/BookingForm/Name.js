import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles  } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(theme => ({
  select: {
    marginLeft: 0,
    minWidth: 60,
  },
  textField: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
}));


function Name ({ booking = {}, onChange: onChangeProp /* loading, errors */ }) {

  const { title, firstName, lastName } = booking;

  const onChange = e => onChangeProp(e.target.name, e.target.value);

  const classes = useStyles();

  return (
    <>
      <TextField
        select
        value={title}
        onChange={onChange}
        name="title"
        label=" "
        className={classes.select}
      >
        {
          ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'].map(addr => (
            <MenuItem key={ addr } value={ addr }>{ addr }</MenuItem>
          ))
        }
      </TextField>
      <TextField
        name="firstName"
        value={firstName}
        onChange={onChange}
        label="First Name"
        maxLength={20}
        className={classes.textField}
        required
      />
      <TextField
        name="lastName"
        value={ lastName }
        onChange={ onChange }
        label="Last Name"
        maxLength={20}
        className={classes.textField}
        required
      />
    </>
  );

}

Name.propTypes = {
  booking: PropTypes.shape({
    // TODO: share this somewhere
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


export default Name;
