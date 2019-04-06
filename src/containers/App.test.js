import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore} from 'redux';
import { Provider } from 'react-redux'
import reducer from '../reducers'
import { ExpansionPanelActions } from '@material-ui/core';

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

// test next button on next chapter
it('is able to goto next chapter', ()=>{
    var nextButton = document.getElementById('nextButton');
    for(var it = 0; it<50;++it){
        nextButton.click();
    }
    var navBook = document.getElementById('navBook');
    var navChapter = document.getElementById('navChapter');
    expect(navBook.value).toBe('ex');
    expect(navChapter.value).toBe('0');
});

// test toggle theme
it('is able to toggle drawer', ()=>{
    var drawer = document.getElementById('drawericon');
    drawer.click();
});

// test toggle theme
it('is able to toggle theme', ()=>{
    var toggle = document.getElementById('toggletheme');
    var app = document.getElementById('App');
    expect(app.className).toBe('App');
    toggle.click();
    expect(app.className).toBe('App  Dark');
    
});