import { Location, LocationAction } from '../interfaces';

export const SET_LOCATION = 'SET_LOCATION';

export function setLocation(location: Location): LocationAction {
    return {
        type: SET_LOCATION,
        location
    };
}
