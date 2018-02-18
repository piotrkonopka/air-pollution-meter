import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setLocation } from '../actions';
import { State, Location, LocationAction } from '../interfaces';
import Pollution from './Pollution';

export interface GeolocationProps {
    location: Location,
    setLocation(location: Location): LocationAction
}

class Geolocation extends PureComponent<GeolocationProps, State> {
    componentDidMount() {
        const { setLocation } = this.props;
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }
    
    render() {
        const { location } = this.props;
        
        return (
            <div>
                <Pollution location={location} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return { location: state.location }
}

export default connect(mapStateToProps, { setLocation })(Geolocation);
