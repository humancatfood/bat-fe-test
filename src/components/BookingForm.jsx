import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { selectBooking, updateBooking } from './../data/actions';



@connect(store => ({
  booking: store.bookings.byId[store.ui.selectedBookingId]
}), {
  selectBooking,
  updateBooking
})
export default class BookingForm extends React.Component
{

  constructor (props, ...rest)
  {
    super(props, ...rest);

    this._onChange = this._onChange.bind(this);
    this._onReset = this._onReset.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      dirty: false,
      ...this._propsToState(props)
    };

  }

  componentWillReceiveProps (nextProps)
  {
    if (nextProps.booking.id !== this.props.booking.id)
    {
      this.setState({
        dirty: false,
        ...this._propsToState(nextProps)
      });
    }
  }

  _onChange (e)
  {
    this.setState({
      dirty: true,
      [e.target.name]: e.target.value
    });
  }

  _onReset ()
  {
    setTimeout(() => {
      this.setState({
        dirty: false,
        ...this._propsToState(this.props)
      });
    });
  }

  _onSubmit (event)
  {
    event.preventDefault();

    const { updateBooking, selectBooking } = this.props;
    this.setState({
      dirty: false
    });

    updateBooking(this._stateToProps(this.state))
      .then(selectBooking(null));

  }

  _propsToState (props)
  {
    const { booking } = props;
    return {
      ...booking,
      status: booking.cancelled ? 'cancelled' : booking.seated ? 'yes' : 'no',
      time: booking.time.replace('.', ':')
    };
  }

  _stateToProps (state)
  {
    return {
      ...state,
      seated: state.status === 'yes',
      cancelled: state.status === 'cancelled',
      time: state.time.replace(':', '.')
    };
  }

  render ()
  {
    const { className } = this.props;
    const { dirty, title, firstName, lastName, time, partySize, status, notes} = this.state;

    return (
      <form onChange={ this._onChange }
            onSubmit={ this._onSubmit }
            onReset={ this._onReset }
            className={ classnames(className, 'bookings-form' ) }>
        {
          this.props.children
        }
        <fieldset>
          <legend>Name</legend>

          <div className="name-input-row">
            <select name="title" value={ title } onChange={ this._onChange } className="static">
              {
                ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'].map(abbr => (
                  <option key={ abbr } value={ abbr }>{ abbr }</option>
                ))
              }
            </select>
            <input type="text" name="firstName" value={ firstName } onChange={ this._onChange } className="dynamic" />
            <input type="text" name="lastName" value={ lastName } onChange={ this._onChange } className="dynamic" />
          </div>

        </fieldset>
        <fieldset>
          <legend>Time</legend>
          <input type="time" name="time" value={ time } onChange={ this._onChange } required />
        </fieldset>
        <fieldset>
          <legend>Covers</legend>
          <input type="number" name="partySize" value={ partySize } onChange={ this._onChange }
                 required min="1" />
        </fieldset>
        <fieldset>
          <legend>Seated</legend>
          <label><input type="radio" name="status" value="no" onChange={ this._onChange } checked={ status == 'no' } />No</label>
          <label><input type="radio" name="status" value="yes" onChange={ this._onChange } checked={ status == 'yes' } />Yes</label>
          <label><input type="radio" name="status" value="cancelled" onChange={ this._onChange } checked={ status == 'cancelled' } />Cancelled</label>
        </fieldset>
        <fieldset>
          <legend>Notes</legend>
          <textarea name="notes" rows="4" value={ notes } onChange={ this._onChange } ></textarea>
        </fieldset>

        <fieldset>
          <button type="submit" disabled={ !dirty } className="button--large">Save Changes</button>
          <button type="reset" disabled={ !dirty } className="button--large">Reset</button>
        </fieldset>

      </form>
    );

  }
}
