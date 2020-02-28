import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { updateBooking } from './../data/actions';



class BookingForm extends React.Component
{

  constructor (props, ...rest)
  {
    super(props, ...rest);

    this._onChange = this._onChange.bind(this);
    this._onReset = this._onReset.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this.state = {
      dirty: false,
      ...this._propsToState(props),
    };

  }

  componentWillReceiveProps (nextProps)
  {

    if (nextProps.booking && this.props.booking && nextProps.booking.id !== this.props.booking.id)
    {
      this.setState({
        dirty: false,
        ...this._propsToState(nextProps),
      });
    }
  }

  _onChange (e)
  {
    this.setState({
      dirty: true,
      [e.target.name]: e.target.value,
    });
  }

  _onReset ()
  {
    setTimeout(() => {
      this.setState({
        dirty: false,
        ...this._propsToState(this.props),
      });
    });
  }

  _onSubmit (event)
  {
    event.preventDefault();

    const { updateBooking, selectBid } = this.props;
    this.setState({
      dirty: false,
    });

    updateBooking(this._stateToProps(this.state))
      .then(selectBid(null));

  }

  _propsToState (props)
  {
    const { booking } = props;
    return {
      ...booking,
      status: booking.cancelled ? 'cancelled' : booking.seated ? 'yes' : 'no',
      time: booking.time.replace('.', ':'),
    };
  }

  _stateToProps (state)
  {
    return {
      ...state,
      seated: state.status === 'yes',
      cancelled: state.status === 'cancelled',
      time: state.time.replace(':', '.'),
    };
  }

  render ()
  {
    const { className, selectBid } = this.props;
    const { dirty, title, firstName, lastName, time, partySize, status, notes} = this.state;

    return (
      <form onChange={ this._onChange }
        onSubmit={ this._onSubmit }
        onReset={ this._onReset }
        onClick={ e => e.stopPropagation() }
        className={ classnames(className, 'bookings-form' ) }>

        <header className="bookings-form__header details-view__heading">
          <h2>Booking update:</h2>
          <button onClick={ () => selectBid(null) } className="close-button" title="close" dangerouslySetInnerHTML={{ __html: '&#x02A2F;' }}></button>
        </header>

        <main className="bookings-form__body">
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
            <label><input type="radio" name="status" value="no" onChange={ this._onChange } checked={ status === 'no' } />No</label>
            <label><input type="radio" name="status" value="yes" onChange={ this._onChange } checked={ status === 'yes' } />Yes</label>
            <label><input type="radio" name="status" value="cancelled" onChange={ this._onChange } checked={ status === 'cancelled' } />Cancelled</label>
          </fieldset>
          <fieldset>
            <legend>Notes</legend>
            <textarea name="notes" rows="4" value={ notes } onChange={ this._onChange } ></textarea>
          </fieldset>
        </main>

        <footer className="bookings-form__footer">
          <fieldset>
            <button type="submit" disabled={ !dirty } className="button--large">Save Changes</button>
            <button type="reset" disabled={ !dirty } className="button--large">Reset</button>
          </fieldset>
        </footer>
      </form>
    );

  }
}

const mapStateToProps = (state, props) => ({
  booking: state.bookings.byId[props.bid],
});

const mapDispatchToProps = {
  updateBooking,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
