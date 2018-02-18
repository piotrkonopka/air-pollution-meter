import React, { PureComponent } from 'react';

import { Location } from '../interfaces';

export interface PollutionProps {
    location: Location
}

class Pollution extends PureComponent<PollutionProps> {
    constructor(props: PollutionProps) {
        super(props);
    }
    
    render() {
        const { location } = this.props;
        
        return (
            <div>
                Lat: { location.lat }
                <br />
                Lng: { location.lng }
            </div>
        );
    }
} 

export default Pollution;
