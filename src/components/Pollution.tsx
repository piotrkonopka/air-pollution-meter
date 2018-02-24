import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { setPollution } from '../actions';
import { LocationData, PollutionData, State, PollutionAction } from '../interfaces';
import config from '../config';
import DisplayData from './DisplayData';

export interface PollutionProps {
    location: LocationData,
    pollution: PollutionData,
    setPollution(pollution: PollutionData): PollutionAction
}

class Pollution extends PureComponent<PollutionProps, State> {
    componentWillReceiveProps(nextProps: PollutionProps) {
        if (Object.keys(nextProps.pollution).length === 0) {
            const { location } = nextProps;
            const myHeaders = new Headers({
                Accept: 'application/json',
                apikey: config.AIRLY_API_KEY
            });

            const url = ['https://airapi.airly.eu/v1/nearestSensor/measurements',
                `?latitude=${location.latitude}`,
                `&longitude=${location.longitude}`,
                '&maxDistance=2000'
            ].join('');

            const myRequest = new Request(url, { 
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
            });

            fetch(myRequest)
                .then(response => response.json())
                .then((data: PollutionData) => {
                        this.props.setPollution(data);
                })
                .catch(error => console.error(error.message));
        }
    }
    
    render() {
        return (
            <div>
                <DisplayData />
            </div>
        );
    }
} 

function mapStateToProps(state: State) {
    return { 
        location: state.location,
        pollution: state.pollution
    };
}

export default connect(mapStateToProps, { setPollution })(Pollution);
