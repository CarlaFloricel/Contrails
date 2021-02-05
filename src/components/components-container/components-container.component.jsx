import React from 'react';

import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import ProjectionContainer from '../projection-container/projection-container.component';


import './components-container.styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ComponentsContainer extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){   
        
    }
   

    render(){
        return(
            <Container fluid >
                <Row xs={12}>
                    <Col xs={1} style={{backgroundColor: '#31393f',height:'100vh', "padding":"0",}}>
                        <QueryPanel/>
                    </Col>
                    <Col xs={7} style={{backgroundColor: '#31393f','borderStyle':'solid','borderWidth': '.5px', borderColor: "#05ecec"}}>
                        <ProjectionContainer renderArea={'top'}/>
                        <ProjectionContainer renderArea={'bottom'}/>
                        {/* <Row xs={5}>
                            <Col xs={12} style={{backgroundColor: '#31393f',height:'50vh','borderStyle':'solid','borderWidth': '.5px', borderColor: "#05ecec"}}>
                                <Clusters/>
                            </Col>
                        </Row> */}
                    </Col>
                    <Col xs={4} style={{backgroundColor: '#31393f',height:'100vh',  "padding":"0", 'borderStyle':'solid','borderWidth': '.5px', borderColor: "#05ecec", overflowY: 'scroll', overflowX: 'hidden'}}>
                        <ParametersPlot/>
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default ComponentsContainer;