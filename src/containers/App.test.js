import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import ReactDOM from 'react-dom';
import App from './App';
import {flush} from '../utils/test';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

import bibleMock from '../../public/en_kjv.json';
describe("general app tests", () => {
    // basic test
    it('renders without crashing', async () => {
        fetch.mockResponse(JSON.stringify(bibleMock));
        const div = document.createElement('div');
        document.body.appendChild(div);
        const store = createStore(reducer);
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>
            , div);
        await flush();
    });


    // test navigation
    it('is able to toggle mute', () => {
        const mute = document.getElementById('mute');
        mute.click();

        const unmute = document.getElementById('unmute');
        unmute.click();
    });

    // test next button on next chapter
    it('is able to goto next chapter', () => {
        const nextButton = document.getElementById('nextButton');
        for (let it = 0; it < 50; ++it) {
            nextButton.click();
        }
        const navBook = document.getElementById('navBook');
        const navChapter = document.getElementById('navChapter');
        expect(navBook.value).toBe('ex');
        expect(navChapter.value).toBe('0');
    });

    // test toggle theme
    it('is able to toggle drawer', () => {
        const drawer = document.getElementById('drawericon');
        drawer.click();
    });

    // test toggle theme
    it('is able to toggle theme', () => {
        const toggle = document.getElementById('toggletheme');
        const app = document.getElementById('App');
        expect(app.className).toBe('App');
        toggle.click();
        expect(app.className).toBe('App  Dark');
        toggle.click();
        expect(app.className).toBe('App');
    });

    // test clicking verse doesn't crash
    it('is able to click a verse', ()=>{
        const verseList = document.getElementsByClassName('Verse');
        expect(verseList.length).toBe(22);
        verseList[0].click();
    });
    
    /*
    // test toggle book and chapter
    it('is able to change book and chapter', ()=>{
        const navBook = document.getElementById('navBook');
        const navChapter = document.getElementById('navChapter');

        navBook.value = 'EX';
        navBook.dispatchEvent( new Event('change', {bubbles: true}));

        navChapter.value = '2';
        navChapter.dispatchEvent( new Event('change', {bubbles: true}));        
    });

    // test toggle language
    it('is able to toggle language', () => {
        const sel = document.getElementById('navText');

        sel.value = 'ZH';
        sel.dispatchEvent( new Event('change', {bubbles: true}));
        expect(fetch).toBeCalledWith('./zh_ncv.json');

        sel.value = 'EL';
        sel.dispatchEvent( new Event('change', {bubbles: true}));
        expect(fetch).toBeCalledWith('./el_greek.json');

        sel.value = 'DE';
        sel.dispatchEvent( new Event('change', {bubbles: true}));
        expect(fetch).toBeCalledWith('./de_schlachter.json');
        
        sel.value = 'FR';
        sel.dispatchEvent( new Event('change', {bubbles: true}));
        expect(fetch).toBeCalledWith('./fr_apee.json');        

        sel.value = 'ES';
        sel.dispatchEvent( new Event('change', {bubbles: true}));
        expect(fetch).toBeCalledWith('./es_rvr.json');
    });

    // test voice swap doesn't crash
    it('is able to change voice language', ()=>{
        const navVoice = document.getElementById('navVoice');
        navVoice.value = 'FR';
        navVoice.dispatchEvent( new Event('change', {bubbles: true}));
    });

    // test tooltip swap doesn't crash
    it('is able to change tooltip language', ()=>{
        const navToolTip = document.getElementById('navToolTip');
        console.log("-------------------");
        console.log(document.querySelector("body").innerHTML);
        navToolTip.value = 'DE';
        navToolTip.dispatchEvent( new Event('change', {bubbles: true}));
    });
    */
});