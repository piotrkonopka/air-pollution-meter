export interface Location {
    lat: number,
    lng: number
}

export interface LocationAction {
    type: string,
    location: Location
}

export interface State {
    location?: Location
}