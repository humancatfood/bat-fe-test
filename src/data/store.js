import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';



export default () => {

  const middleWare = [
    thunk
  ];

  if (process.env.NODE_ENV === 'development')
  {
    window.console.info("creating logger");
    middleWare.push(createLogger());
  }

  return createStore(
    reducers,
    applyMiddleware(...middleWare)
  );

};
