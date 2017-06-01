import React from 'react';
import { connect } from 'react-redux';

import { selectDate } from './../data/actions';



const dateSelectorComponent = ({ selectedDate, selectDate }) => (
  <input type="date" name="date" value={ selectedDate } onChange={ e => selectDate(e.target.value) } required />
);

const store2props = store => ({
  selectedDate: store.ui.selectedDate
});

const dispatch2props = ({
  selectDate
});


export default connect(store2props, dispatch2props)(dateSelectorComponent);
