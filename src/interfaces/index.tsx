export interface LocationData {
    latitude: number,
    longitude: number
}

export interface LocationAction {
    type: string,
    location: LocationData
}

export interface AddressData {
    country: string,
    locality: string,
    route: string,
    streetNumber: string
}

export interface PollutionData {
    address: AddressData
    airQualityIndex: number,
    distance: number,
    id: number,
    location: LocationData
    measurementTime: string,
    name: string,
    pm10: number,
    pm25: number,
    pollutionLevel: number,
    vendor: string
}

export interface PollutionAction {
    type: string,
    pollution: PollutionData
}

export interface GoogleRequestType {
    query: string
}

export interface State {
    location?: LocationData,
    pollution?: PollutionData,
    googleRequest?: GoogleRequestType
    googleService?: {
        textSearch(request: GoogleRequestType, callback: {}): void
    }
}