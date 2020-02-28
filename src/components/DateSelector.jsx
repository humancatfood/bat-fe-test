import React from 'react';



const DateSelector = ({ date, onChange }) => (
  <input
    type="date"
    name="date"
    value={date}
    onChange={event => onChange(event.target.value)}
    required
  />
);

export default DateSelector;
