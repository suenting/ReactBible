import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore} from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import { ExpansionPanelActions } from '@material-ui/core';

import bibleMock from '../../public/en_kjv.json';

// basic test
it('renders without crashing', () => {
  fetch.mockResponse(JSON.stringify(bibleMock));
  const div = document.createElement('div');
  document.body.appendChild(div);
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>
      , div);
  setTimeout(10);
});


// test navigation
it('is able to toggle mute', () => {
  const mute = document.getElementById('mute');
  mute.click();

  const unmute = document.getElementById('unmute');
  unmute.click();
});

// test next button on next chapter
it('is able to goto next chapter', ()=>{
    const nextButton = document.getElementById('nextButton');
    for(let it = 0; it<50;++it){
        nextButton.click();
    }
    const navBook = document.getElementById('navBook');
    const navChapter = document.getElementById('navChapter');
    expect(navBook.value).toBe('ex');
    expect(navChapter.value).toBe('0');
});

// test toggle theme
it('is able to toggle drawer', ()=>{
    const drawer = document.getElementById('drawericon');
    drawer.click();
});

// test toggle theme
it('is able to toggle theme', ()=>{
    const toggle = document.getElementById('toggletheme');
    const app = document.getElementById('App');
    expect(app.className).toBe('App');
    toggle.click();
    expect(app.className).toBe('App  Dark');
    
});