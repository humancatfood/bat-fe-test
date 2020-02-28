# Bookatable Front End Test


To run:

1) clone the repo and cd into it
2) `npm/yarn install`
3) `npm/yarn start`

_OR_

Go to

https://humancatfood.github.io/bat-fe-test/

## Requirements


> * See which diners have already arrived
> * Tell which diners have yet to arrive
> * Quickly see which diners have cancelled their bookings

Yes, you can sort the bookings table by status to see all seated / unseated / cancelled people grouped together.

(A better solution might be a proper filter.)

> * Tell quickly which booking to expect to arrive next

Yes, you can sort the bookings table by time.

(A better solution might allow filtering out bookings that are in the past so the next expected on is always on top.)

> * Change the status of a booking

Yes, you can do that. Click on a booking and edit it in the form.

(A better solution might have a quick-edit feature that lets you mark people as seated without opening the booking)

> *Tell one booking from another

Well, they're in different rows. Should be enough, no?


> * No UI libraries e.g. Bootstrap or Material-UI
> * Do not use additional or alternative JavaScript processors i.e. no CoffeeScript, LiveScript or TypeScript
> * No JavaScript helper frameworks or animation libraries such as jQuery, Dojo, Velocity etc.

Nope, did none of that (unless you count `babel-polyfill` or `classnames`)


## Extra bits

From the wireframes and the way the mock-data is laid out (array of objects that include a date) I assume that it's supposed to handle multiple dates' worth of booking data. I've added some more mock-bookings. Change the date to the 11., 12., or 16. March to see them.


## Known problems & TODOs

- Fix the build-process to copy the favicon to the dist-folder or it won't work after deploying.
- Make the build-process more data-driven, so there is less stuff hardcoded into the index.html file.
- Factor the map-state-to props functions into the respective reducers so the components aren't so coupled to the store-layout.
- Trying to submit the form by pressing `enter` in any of the fields fails with the error `Form submission canceled because the form is not connected`
