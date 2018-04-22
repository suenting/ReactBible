import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import { Provider } from 'react-redux'
import App from './containers/App';
import reducer from './reducers'

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './lib/bootstrap.css';

const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
