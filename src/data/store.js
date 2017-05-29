import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';



export default () => {

  const middleWare = [];

  if (ENV.DEBUG)
  {
    window.console.info("creating logger");
    middleWare.push(createLogger());
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middleWare)
  );

  return store;

};


