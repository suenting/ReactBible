import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore} from 'redux';
import { Provider } from 'react-redux'
import reducer from '../reducers'

// ui level testing

// basic test
it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>
      , div);
});


// test navigation
it('is able to toggle mute', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>
      , div);
  var mute = document.getElementById('mute');
  mute.click();

  var unmute = document.getElementById('unmute');
  unmute.click();
});