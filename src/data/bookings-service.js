/* Mock interface to load and save bookings to the "back end" */

import { v4 } from 'uuid';

import bookingsByDay from './bookings.json';




const cache = {};

const _fetchData = async () => {

  if (!cache.data)
  {
    cache.data = bookingsByDay
      .map(day => ({
        ...day,
        bookings: day.bookings.map(booking => ({
          ...booking,
          _id: v4(),
        })),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return cache.data;

};

const _saveData = async (newBooking) => {

  const data = await _fetchData();

  return data.some(({ bookings }) => {
    const oldBooking = bookings.find(booking => booking._id === newBooking._id);
    if (oldBooking)
    {
      Object.assign(oldBooking, newBooking);
      return true;
    }
    else
    {
      return false;
    }
  });

};



export const getLatestBookings = async () => {
  const data = await _fetchData();
  return data[data.length-1];
};


export const getBookingsForDate = async (date=null) => {
  const data = await _fetchData();
  return data.find(bookings => date === bookings.date);
};


export const saveBooking = async (booking) => {

  if (await _saveData(booking))
  {
    return booking;
  }
  else
  {
    throw new Error(404);
  }

};
