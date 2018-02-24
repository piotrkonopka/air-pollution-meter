import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Panel from 'react-bootstrap/lib/Panel';

import { PollutionData, State } from '../interfaces/';

export interface DisplayDataProps {
    pollution: PollutionData
}

class DisplayData extends PureComponent<DisplayDataProps, State> {
    canvas: HTMLCanvasElement;
    image: Image;
    city: FormControl;
    
    componentDidMount() {
        this.displayData();
    }
    
    componentDidUpdate() {
        this.displayData();
    }
    
    displayData() {
        const canvas = (ReactDOM.findDOMNode(this.canvas) as HTMLCanvasElement);
        let context = (canvas.getContext('2d') as CanvasRenderingContext2D);
        const { pollution } = this.props;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (Object.keys(pollution).length !== 0) {
                const colors: string[] = [
                    'green',
                    'yellow',
                    'orange',
                    'red',
                    'crimson',
                    'darkred'
                ];
                const pollutionLevel: string[] = [
                    'very good',
                    'good',
                    'no so good',
                    'poor',
                    'bad',
                    'very bad'
                ];
                
                context.clearRect(0, 0, canvas.width, canvas.height);
                
                context.fillStyle = 'black';
                context.fillRect(0, 0, 400, 100);
                context.fillStyle = colors[pollution.pollutionLevel - 1];
                context.fillRect(10, 10, 80, 80);
                context.font = '48px serif';
                context.fillStyle = 'black';
                context.fillText(Math.round(pollution.airQualityIndex).toString(), 25, 65);

                context.font = '12px serif';
                context.fillStyle = 'white';
                context.fillText(`${pollution.address.locality}, ${pollution.address.route}`, 110, 20);
                context.font = '16px serif';
                context.fillText(`Air quality is ${pollutionLevel[pollution.pollutionLevel - 1]}`, 110, 40);
                context.font = '12px serif';
                context.fillText(`PM10: ${Math.round(pollution.pm10)}%`, 110, 60);
                context.fillText(`PM25: ${Math.round(pollution.pm25)}%`, 110, 80);
        } else {
                context.font = '40px serif';
                context.fillStyle = 'black';
                context.fillText('Data Not Available', 5, 65);
        }

        const dataURL = canvas.toDataURL();
        (ReactDOM.findDOMNode(this.image) as HTMLImageElement).src = dataURL;
    }
    
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <Panel bsStyle="primary">
                            <Panel.Heading>
                                <Panel.Title componentClass="h4">Air Quality Meter</Panel.Title>
                            </Panel.Heading>
                            
                            <Panel.Body>
                                <form>
                                    <FormGroup controlId="formBasicText">
                                        <ControlLabel>Enter city name:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            ref={city => this.city = (city as FormControl)} 
                                            placeholder="city name"
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </form>
                                
                                <Image 
                                    ref={image => this.image = (image as Image)} 
                                    src=""
                                />
                            </Panel.Body>
                            
                            <Panel.Footer>
                                <Button bsStyle="primary">
                                    Check pollution level in chosen city
                                </Button>
                            </Panel.Footer>
                        </Panel>
                        
                        <canvas 
                            ref={canvas => this.canvas = (canvas as HTMLCanvasElement)} 
                            className="canvas" 
                            width={328} 
                            height={100} 
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state: State) {
    return { pollution: state.pollution };
}

export default connect(mapStateToProps)(DisplayData);