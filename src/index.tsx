import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';

import 'bootstrap-css-only';
import './index.css'

ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
            </Switch>
        </BrowserRouter>, 
    document.getElementById('root'));
