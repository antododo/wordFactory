//
// OLD INDEX
//
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App'
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from './core/store/configureStore';
import App            from './App';

// Bootstrap Style & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
