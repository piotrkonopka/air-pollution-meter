import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';

import 'bootstrap-css-only';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/" component={App} />
        </Switch>
    </BrowserRouter>, 
    document.getElementById('root'));
