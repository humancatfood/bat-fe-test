import React from 'react';
import classnames from 'classnames';



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

    if (nextProps.booking && this.props.booking && nextProps.booking._id !== this.props.booking._id)
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

    const { onSubmit } = this.props;
    this.setState({
      dirty: false,
    });

    onSubmit(this._stateToProps(this.state));

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
      title: state.title || 'Mr',
      partySize: Number(state.partySize),
      seated: state.status === 'yes',
      cancelled: state.status === 'cancelled',
      time: state.time.replace(':', '.'),
    };
  }

  render ()
  {
    const { className, onCancel, newBooking } = this.props;
    const { dirty, title, firstName, lastName, time, partySize, status, notes} = this.state;

    return (
      <form onChange={ this._onChange }
        onSubmit={ this._onSubmit }
        onReset={ this._onReset }
        onClick={ e => e.stopPropagation() }
        className={ classnames(className, 'bookings-form' ) }
        data-cy="booking-form"
      >

        <header className="bookings-form__header details-view__heading">
          <h2 data-cy="booking-form__title">{ newBooking ? 'New Booking' : 'Booking update' }:</h2>
          <button
            onClick={onCancel }
            className="close-button"
            title="close"
            data-cy="booking-form__cancel"
            dangerouslySetInnerHTML={{ __html: '&#x02A2F;' }}
          />
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
              <input
                type="text"
                name="firstName"
                value={ firstName }
                onChange={ this._onChange }
                className="dynamic"
                autoFocus
                data-cy="booking-form__input--first-name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={ lastName }
                onChange={ this._onChange }
                className="dynamic"
                data-cy="booking-form__input--last-name"
                required
              />
            </div>

          </fieldset>
          <fieldset>
            <legend>Time</legend>
            <input
              type="time"
              name="time" value={ time } onChange={ this._onChange }
              data-cy="booking-form__input--time"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Covers</legend>
            <input
              type="number"
              name="partySize"
              value={ partySize }
              onChange={ this._onChange }
              min="1"
              data-cy="booking-form__input--party-size"
              required
            />
          </fieldset>
          {
            !newBooking && (
              <>
                <fieldset>
                  <legend>Seated</legend>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="no"
                      onChange={ this._onChange }
                      checked={ status === 'no' }
                      data-cy="booking-form__input--seated--no"
                    />No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="yes"
                      onChange={ this._onChange }
                      checked={ status === 'yes' }
                      data-cy="booking-form__input--seated--yes"
                    />Yes</label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="cancelled"
                      onChange={ this._onChange }
                      checked={ status === 'cancelled' }
                      data-cy="booking-form__input--cancelled"
                    />Cancelled</label>
                </fieldset>
              </>
            )
          }
          <fieldset>
            <legend>Notes</legend>
            <textarea
              name="notes"
              rows="4"
              value={ notes }
              onChange={ this._onChange }
              data-cy="booking-form__input--notes"
            />
          </fieldset>
        </main>

        <footer className="bookings-form__footer">
          <fieldset>
            <button
              type="submit"
              disabled={ !dirty }
              className="button--large"
              data-cy="booking-form__save"
            >Save Changes</button>
            <button
              type="reset"
              disabled={ !dirty }
              className="button--large"
              data-cy="booking-form__reset"
            >Reset</button>
          </fieldset>
        </footer>
      </form>
    );

  }
}


export default BookingForm;
