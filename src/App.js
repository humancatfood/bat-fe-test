/* Feel free to edit */
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import classnames from 'classnames';

import { Provider as GraphQLProvider } from './data';

import { useBookingSelector } from './data';

import configureStore from './data/store';

import { Router, Route, Switch } from './components/Routing';

import Overview from './views/Overview';
import FourOhFour from './views/FourOhFour';

import Header from './components/Header';
import DailyBookingsView from 'views/DailyBookings';
import BookingDetailView from 'views/BookingDetail';



const App = () => {

  const [bid] = useBookingSelector();

  return (
    <div className="layout">
      {/* <GraphQLTest /> */}
      <Header className="layout__header"/>
      <main className={ classnames('layout__body', {'has-selected': !!bid}) }>
        <Switch>
          <Route path="/"exact component={Overview} />
          <Route path="/:date(\d{4}-\d{2}-\d{2})" render={({ match }) => (
            <>
              <DailyBookingsView date={match.params.date }/>
              {
                bid && (
                  <BookingDetailView bid={bid} />
                )
              }
            </>
          )}>
          </Route>
          <Route component={FourOhFour} />
        </Switch>
      </main>
    </div>
  );
};



const ProvidedApp = () => (
  <Router>
    <GraphQLProvider>
      <ReduxProvider store={ configureStore() }>
        <App />
      </ReduxProvider>
    </GraphQLProvider>
  </Router>
);

export default ProvidedApp;
