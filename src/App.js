/* Feel free to edit */
import React, { Component } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Provider as GraphQLProvider, hooks as dataHooks } from './data';

import configureStore from './data/store';
import { loadLatestBookings } from './data/actions';

import Header from './components/Header';
import BookingsTableView from './components/BookingsTableView';
import BookingDetailView from './components/BookingDetailView';



const GraphQLTest = () => {

  const res = dataHooks.useBookings('tomorrow');

  console.log('res:', res);

  return null;
};

class App extends Component {

  componentDidMount ()
  {
    this.props.loadLatestBookings();
  }

  render ()
  {
    return (
      <div className="layout">
        <GraphQLTest />
        <Header className="layout__header"/>
        <main className={ classnames('layout__body', {'has-selected': this.props.hasSelected}) }>
          <BookingsTableView />
          <BookingDetailView />
        </main>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  hasSelected: !!state.ui.selectedBookingId,
});

const mapDispatchToProps = {
  loadLatestBookings,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const ProvidedApp = () => (
  <GraphQLProvider>
    <ReduxProvider store={ configureStore() }>
      <ConnectedApp />
    </ReduxProvider>
  </GraphQLProvider>
);

export default ProvidedApp;
