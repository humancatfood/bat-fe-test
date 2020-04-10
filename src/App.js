/* Feel free to edit */
import React, { useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider as GraphQLProvider } from './data';

import configureStore from './data/store';


import Overview from './views/Overview';
import FourOhFour from './views/FourOhFour';

import DailyBookingsView from 'views/DailyBookings';


const App = () => {

  const store = useMemo(configureStore, [ configureStore ]);
  const theme = useMemo(createMuiTheme, [ createMuiTheme ]);

  return (
    <BrowserRouter>
      <GraphQLProvider>
        <ReduxProvider store={ store }>
          <ThemeProvider theme={ theme }>
            <CssBaseline />
            <Switch>
              <Route path="/" exact component={Overview} />
              <Route path="/:date(\d{4}-\d{2}-\d{2})" component={DailyBookingsView} />
              <Route component={FourOhFour} />
            </Switch>
          </ThemeProvider>
        </ReduxProvider>
      </GraphQLProvider>
    </BrowserRouter>
  );
};

export default App;
