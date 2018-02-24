import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setLocation } from '../actions';
import { State, LocationData, LocationAction } from '../interfaces';
import Pollution from './Pollution';

export interface GeolocationProps {
    location: LocationData,
    setLocation(location: LocationData): LocationAction
}

class Geolocation extends PureComponent<GeolocationProps, State> {
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.props.setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        }
    }
    
    render() {
        return (
            <div>
                <Pollution />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return { location: state.location };
}

export default connect(mapStateToProps, { setLocation })(Geolocation);
