import React from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Name from './Name';
import TimePicker from './Time';
import PartySize from './PartySize';
import Status from './Status';
import Notes from './Notes';

import * as Components from './Components';



function BookingForm (props) {

  // TODO: architect the responsiveness properly, instead of prop-drilling or repeating "dense"m "brk", etc
  const dense = useMediaQuery('(max-width:480px)');
  const brk = useMediaQuery('(max-width:400px)');

  return (
    <Components.Wrapper dense={dense}>

      <Components.FormRow dense={dense}>
        <Name {...props}/>
      </Components.FormRow>

      <Components.FormRow dense={dense}>
        <PartySize {...props}/>
      </Components.FormRow>

      {
        brk ? (
          <>
            <Components.FormRow dense={dense}>
              <TimePicker {...props}/>
            </Components.FormRow>

            <Components.FormRow dense={dense} paddingLeft={6}>
              <Status {...props}/>
            </Components.FormRow>
          </>
        ) : (
          <Components.FormRow dense={dense}>
            <TimePicker {...props}/>
            <Components.Divider dense={dense}/>
            <Status {...props}/>
          </Components.FormRow>
        )
      }
      <Components.Spacer flex={2} />
      <Components.FormRow dense={dense} mb={0} mt={2}>
        <Notes {...props}/>
      </Components.FormRow>

    </Components.Wrapper>
  );

}

BookingForm.propTypes = {
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


export default BookingForm;
