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
    
    
    // test toggle book and chapter
    it('is able to change book and chapter', ()=>{
        const navBook = document.getElementById('navBook');
        const navChapter = document.getElementById('navChapter');

        fireEvent.change(navBook, { target: { value: "ex" } });
        fireEvent.change(navChapter, { target: { value: "2" } });
    });

    // test toggle language
    it('is able to toggle language', async () => {
        // arrange
        fetch.mockResponse(JSON.stringify(bibleMock));
        const sel = document.getElementById('navText');

        fireEvent.change(sel, { target: { value: "ZH" } });
        await flush();
        expect(fetch).toBeCalledWith('./zh_ncv.json');

        fireEvent.change(sel, { target: { value: "EL" } });
        await flush();
        expect(fetch).toBeCalledWith('./el_greek.json');

        fireEvent.change(sel, { target: { value: "DE" } });
        await flush();
        expect(fetch).toBeCalledWith('./de_schlachter.json');
        
        fireEvent.change(sel, { target: { value: "FR" } });
        await flush();
        expect(fetch).toBeCalledWith('./fr_apee.json');        

        fireEvent.change(sel, { target: { value: "ES" } });
        await flush();
        expect(fetch).toBeCalledWith('./es_rvr.json');
    });

    // test voice swap doesn't crash
    it('is able to change voice language', async()=>{
        const navVoice = document.getElementById('navVoice');
        fireEvent.change(navVoice, { target: { value: "FR" } });
        await flush();
    });

    // test tooltip swap doesn't crash
    it('is able to change tooltip language', async()=>{
        const navToolTip = document.getElementById('navToolTip');
        fireEvent.change(navToolTip, { target: { value: "DE" } });
        await flush();
        
    });
});