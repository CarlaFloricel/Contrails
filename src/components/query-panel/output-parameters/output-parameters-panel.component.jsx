import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

class OutputParametersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVal: 0,
            value: [4, 5],
            paramType: 'lagrangian',
            T_lag: false,
            rho_lag: false,
            d_lag: false,
            Ygas_lag: false,
            T_eul: false,
            rho_eul: false,
            p_eul: false,
            k_eul: false,
            T_lag_avg: "",
            rho_lag_avg: "",
            d_lag_avg: "",
            Ygas_lag_avg: "",
            T_eul_avg: "",
            rho_eul_avg: "",
            p_eul_avg: "",
            k_eul_avg: "",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleOutputFilterChange = this.handleOutputFilterChange.bind(this);
    }

    handleChange(event) {
        this.setState({ paramType: event.target.value });
        if (event.target.value === 'lagrangian') {
            this.setState({ T_eul: false, rho_eul: false, p_eul: false, k_eul: false, T_eul_avg: "", rho_eul_avg: "", k_eul_avg: "", p_eul_avg: "" }, () => {
                this.handleOutputFilterChange(event, 'T_eul_avg')
                this.handleOutputFilterChange(event, 'rho_eul_avg')
                this.handleOutputFilterChange(event, 'p_eul_avg')
                this.handleOutputFilterChange(event, 'k_eul_avg')
            })

        }
        else {
            this.setState({ T_lag: false, rho_lag: false, d_lag: false, Ygas_lag: false, T_lag_avg: "", rho_lag_avg: "", d_lag_avg: "", Ygas_lag_avg: "" }, () => {
                this.handleOutputFilterChange(event, 'T_lag_avg')
                this.handleOutputFilterChange(event, 'rho_lag_avg')
                this.handleOutputFilterChange(event, 'Ygas_lag_avg')
                this.handleOutputFilterChange(event, 'd_lag_avg')

            })


        }
    }

    handleButton(event) {
        var el = event.target.id.toString()
        if (el === "T_lag") {
            this.setState({ T_lag: !this.state.T_lag }, () => {
                if (!this.state.T_lag)
                    this.handleOutputFilterChange(event, 'T_lag_avg')
            })


        }
        if (el === "T_eul") {
            this.setState({ T_eul: !this.state.T_eul }, () => {
                if (!this.state.T_eul)
                    this.handleOutputFilterChange(event, 'T_eul_avg')
            })
        }
        if (el === "rho_eul") {
            this.setState({ rho_eul: !this.state.rho_eul }, () => {
                if (!this.state.rho_eul)
                    this.handleOutputFilterChange(event, 'rho_eul_avg')
            })
        }
        if (el === "rho_lag") {
            this.setState({ rho_lag: !this.state.rho_lag }, () => {
                if (!this.state.rho_lag)
                    this.handleOutputFilterChange(event, 'rho_lag_avg')
            })
        }
        if (el === "Ygas_lag") {
            this.setState({ Ygas_lag: !this.state.Ygas_lag }, () => {
                if (!this.state.Ygas_lag)
                    this.handleOutputFilterChange(event, 'Ygas_lag_avg')
            })
        }
        if (el === "d_lag") {
            this.setState({ d_lag: !this.state.d_lag }, () => {
                if (!this.state.d_lag)
                    this.handleOutputFilterChange(event, 'd_lag_avg')
            })
        }
        if (el === "p_eul") {
            this.setState({ p_eul: !this.state.p_eul }, () => {
                if (!this.state.p_eul)
                    this.handleOutputFilterChange(event, 'p_eul_avg')
            })
        }
        if (el === "k_eul") {
            this.setState({ k_eul: !this.state.k_eul }, () => {
                if (!this.state.k_eul)
                    this.handleOutputFilterChange(event, 'k_eul_avg')
            })
        }

    }

    handleOutputFilterChange(event, param) {
        var id = 0
        var val = ""
        if (param) {
            id = param
        }
        else {
            id = event.target.id.replace('_dropdown', '')
            val = event.target.value


        }

            if (id === "T_lag_avg") this.setState({ T_lag_avg: val })
            if (id === "T_eul_avg") this.setState({ T_eul_avg: val })
            if (id === "rho_lag_avg") this.setState({ rho_lag_avg: val })
            if (id === "rho_eul_avg") this.setState({ rho_eul_avg: val })
            if (id === "d_lag_avg") this.setState({ d_lag_avg: val })
            if (id === "Ygas_lag_avg") this.setState({ Ygas_lag_avg: val })
            if (id === "p_eul_avg") this.setState({ p_eul_avg: val })
            if (id === "k_eul_avg") this.setState({ k_eul_avg: val })
        
        var send_tuple = []
        send_tuple.push(id)
        send_tuple.push(parseFloat(event.target.value))
        this.props.onOutputSelectChange(send_tuple)
    }


    render() {
        return (
            <div className="mx-auto">

                <Container>
                    <h6>Output Parameters</h6>
                    <Form onChange={this.handleChange}>
                        <Form.Control as="select" className="form-control-sm" style={{ backgroundColor: 'grey', color: 'white' }}>
                            <option value="lagrangian">Lagrangian</option>
                            <option value="eulerian">Eulerian</option>
                        </Form.Control>
                    </Form>
                    <Row>
                        <Col xs={5}>
                            {this.state.paramType == 'lagrangian' ?
                                <Form style={{ textAlign: 'left', marginLeft: "10%" }}>
                                    <Form.Check type="checkbox" checked={this.state.T_lag} id="T_lag" label="T" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" checked={this.state.rho_lag} id="rho_lag" onChange={this.handleButton} label="rho" />
                                    <Form.Check type="checkbox" checked={this.state.d_lag} id="d_lag" onChange={this.handleButton} label="d" />
                                    <Form.Check type="checkbox" checked={this.state.Ygas_lag} id="Ygas_lag" onChange={this.handleButton} label="Ygas" />
                                </Form>
                                :
                                <Form style={{ textAlign: 'left', marginLeft: "10%" }}>
                                    <Form.Check type="checkbox" checked={this.state.T_eul} label="T" id="T_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" cheched={this.state.rho_eul} label="rho" id="rho_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" checkec={this.state.p_eul} label="p" id="p_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" checked={this.state.k_eul} label="k" id="k_eul" onChange={this.handleButton} />
                                </Form>

                            }
                        </Col>
                        <Col xs={7}>
                            {this.state.paramType == 'lagrangian' ?
                                <div>

                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.T_lag == true ? 'show' : 'hidden'} >
                                        <Form.Control as="select" value={this.state.T_lag_avg} className="form-control-sm interior-form" id="T_lag_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="" >T_avg</option>
                                            <option value="420">420</option>
                                            <option value="490">490</option>
                                            <option value="530">530</option>
                                            <option value="590">590</option>
                                        </Form.Control>
                                    </Form>

                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.rho_lag == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.rho_lag_avg} className="form-control-sm interior-form" id="rho_lag_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">rho_avg</option>
                                            <option value="1000">1000</option>
                                            <option value="2000">2000</option>
                                            <option value="3000">3000</option>
                                            <option value="4000">4000</option>
                                        </Form.Control>
                                    </Form>
                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.d_lag == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.d_lag_avg} className="form-control-sm interior-form" id="d_lag_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">d_avg</option>
                                            <option value="0.00001">0.00001</option>
                                            <option value="0.0002">0.0002</option>
                                            <option value="0.08">0.08</option>
                                            <option value="0.2">0.2</option>
                                        </Form.Control>
                                    </Form>

                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.Ygas_lag == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.Ygas_lag_avg} className="form-control-sm interior-form" id="Ygas_lag_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">Ygas_avg</option>
                                            <option value="0">0</option>
                                        </Form.Control>
                                    </Form>
                                </div> :
                                <div>
                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.T_eul == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.T_eul_avg} className="form-control-sm interior-form" id="T_eul_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">T_avg</option>
                                            <option value="322">322</option>
                                            <option value="360">360</option>
                                            <option value="363">363</option>
                                            <option value="425">425</option>
                                        </Form.Control>
                                    </Form>

                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.rho_eul == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.rho_eul_avg} className="form-control-sm interior-form" id="rho_eul_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">rho_avg</option>
                                            <option value="0.2">0.2</option>
                                            <option value="0.3">0.3</option>
                                            <option value="300.400">0.4</option>
                                        </Form.Control>
                                    </Form>
                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.p_eul == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.p_eul_avg} className="form-control-sm interior-form" id="p_eul_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">p_avg</option>
                                            <option value="28472">28472</option>
                                            <option value="29292">29292</option>
                                            <option value="39357">39357</option>
                                            <option value="45900">45900</option>
                                        </Form.Control>
                                    </Form>

                                    <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className={this.state.k_eul == true ? 'show' : 'hidden'}>
                                        <Form.Control as="select" value={this.state.k_eul_avg} className="form-control-sm interior-form" id="k_eul_avg_dropdown" style={{ backgroundColor: '#636363', color: 'white' }}>
                                            <option value="">k_avg</option>
                                            <option value="100">83</option>
                                            <option value="200">86</option>
                                            <option value="300">91</option>
                                            <option value="400">94</option>
                                        </Form.Control>
                                    </Form>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container>

            </div>

        )
    }
}

export default OutputParametersPanel;