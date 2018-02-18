import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import rootReducer from './reducers';

import 'bootstrap-css-only';
import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
