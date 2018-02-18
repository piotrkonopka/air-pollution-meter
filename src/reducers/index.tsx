import { combineReducers } from 'redux';

import { SET_LOCATION } from '../actions';
import { LocationAction, State } from '../interfaces';

function location(state: State = {}, action: LocationAction) {
    switch(action.type) {
        case SET_LOCATION:
            return action.location;
        default:
            return state;
    }
}

export default combineReducers({location});
