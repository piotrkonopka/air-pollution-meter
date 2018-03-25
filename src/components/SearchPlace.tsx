import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import scriptLoader from 'react-async-script-loader';

import Button from 'react-bootstrap/lib/Button';

import { setLocation } from '../actions';
import { State, LocationData, LocationAction, GoogleRequestType } from '../interfaces';
import config from '../config';

export interface SearchPlaceOwnProps {
    cityData: HTMLInputElement
}

export interface SearchPlaceProps extends SearchPlaceOwnProps {
    isScriptLoaded: boolean,
    isScriptLoadSucceed: boolean,
    location: LocationData,
    setLocation(location: LocationData): LocationAction
}

class SearchPlace extends PureComponent<SearchPlaceProps, State> {
    constructor(props: SearchPlaceProps) {
        super(props);
    }
    
    googleCallback(results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length >= 1) {
            let place = results[0];
            let position = place.geometry.location.toJSON();
            
            this.props.setLocation({
                latitude: position.lat,
                longitude: position.lng
            });
        }
    }
    
    initMap() {
        this.setState({
            googleRequest: { query: 'Wroclaw' },
            googleService: new google.maps.places.PlacesService(document.createElement('div'))
        });
    }
    
    getPlaceData() {
        if (typeof this.props.cityData.value === 'string' && 
            this.props.cityData.value.length > 3 &&
            this.props.cityData.value.length < 20) {
            this.setState({googleRequest: { query: this.props.cityData.value }}, () => {
                const request = this.state.googleRequest as GoogleRequestType;
                const service = this.state.googleService;

                if (typeof service !== 'undefined') {
                    service.textSearch(request, this.googleCallback.bind(this));
                }
            });
        }
    }
    
    componentWillReceiveProps(nextProps: SearchPlaceProps) {
        const {isScriptLoaded, isScriptLoadSucceed} = nextProps;
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.initMap();
            }
        }
    }

    render() {
        return (
            <Button bsStyle="primary" onClick={() => this.getPlaceData()}>
                Check pollution level in chosen city
            </Button>
        );
    }
}

function mapStateToProps(state: State, ownProps: SearchPlaceOwnProps) {
    return {
        isScriptLoaded: false,
        isScriptLoadSucceed: false,
        location: state.location,
        cityData: ownProps.cityData
    };
}

const SearchPlaceComponent = scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?' +
        'key=' + config.GOOGLE_MAPS_API_KEY + '=places'
    ]
)(SearchPlace);

export default connect(mapStateToProps, {setLocation})(SearchPlaceComponent);
