import { combineReducers } from 'redux';

import bookings from './reducer--bookings';
import ui from './reducer--ui';



export default combineReducers({
  bookings,
  ui
});
