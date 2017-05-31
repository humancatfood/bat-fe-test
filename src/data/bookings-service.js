/* Mock interface to load and save bookings to the "back end" */

import { v4 } from 'uuid';

import bookingsByDay from './bookings.json';




const data = bookingsByDay
  .map(day => ({
    ...day,
    bookings: day.bookings.map(booking => ({
      ...booking,
      id: v4()
    }))
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));


export const getLatestBookings = async () => data[data.length-1];


export const getBookingsForDate = async (date=null) => data.find(bookings => date === bookings.date);


export const saveBookings = async () => data;
