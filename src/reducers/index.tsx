import { combineReducers } from 'redux';

import { SET_LOCATION, SET_POLLUTION } from '../actions';
import { LocationAction, State, PollutionAction } from '../interfaces';

function location(state: State = {}, action: LocationAction) {
    switch (action.type) {
        case SET_LOCATION:
            return action.location;
        default:
            return state;
    }
}

function pollution(state: State = {}, action: PollutionAction) {
    switch (action.type) {
        case SET_POLLUTION:
            return action.pollution;
        default:
            return state;
    }
}

export default combineReducers({ location, pollution });
