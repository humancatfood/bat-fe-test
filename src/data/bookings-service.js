/* Mock interface to load and save bookings to the "back end" */

import { v4 } from 'uuid';

import bookingsByDay from './bookings.json';



const data = bookingsByDay.map(day => ({
  ...day,
  bookings: day.bookings.map(booking => ({
    ...booking,
    id: v4()
  }))
}));


export const getBookings = async (date=null) => (
  date ?
    data.find(bookings => date === bookings.date) :
    data[data.length-1]
);


export const saveBookings = async () => data;
