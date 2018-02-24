import { LocationData, LocationAction, PollutionData, PollutionAction } from '../interfaces';

export const SET_LOCATION = 'SET_LOCATION';
export const SET_POLLUTION = 'SET_POLLUTION';

export function setLocation(location: LocationData): LocationAction {
    return {
        type: SET_LOCATION,
        location
    };
}

export function setPollution(pollution: PollutionData): PollutionAction {
    return {
        type: SET_POLLUTION,
        pollution
    };
}
