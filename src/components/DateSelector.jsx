import React from 'react';
import { connect } from 'react-redux';

import { selectDate } from './../data/actions';



const dateSelectorComponent = ({ selectedDate, availableDates, selectDate }) => (
  <select name="date" onChange={ e => selectDate(e.target.value) }>
    {
      availableDates.map(date => (
        <option value={date}>{ new Date(date).toDateString() }</option>
      ))
    }
  </select>
);

const store2props = store => ({
  selectedDate: store.ui.selectedDate,
  availableDates: Object.keys(store.bookings.byDate)
});

const dispatch2props = ({
  selectDate
});


export default connect(store2props, dispatch2props)(dateSelectorComponent);
