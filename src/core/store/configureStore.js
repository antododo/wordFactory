import { applyMiddleware, createStore } from 'redux';
import reduxThunk                       from 'redux-thunk';
import createLogger                     from 'redux-logger';
import rootReducer                      from '../reducers';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
    process.env.NODE_ENV === 'development'
  });

  const middleware = applyMiddleware(reduxThunk, logger);

  // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // Needed for Redux devtool in Browser
  const store = middleware(createStore)(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
