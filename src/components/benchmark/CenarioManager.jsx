import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Button, TabContent } from "react-bootstrap";
import { addConjunto } from "../../redux/actions/praticasActions";
import { connect } from "react-redux";
import Cenario from "./Cenario";

class CenarioManager extends Component {
    static propTypes = {
        // prop: PropTypes,
    };

    constructor() {
        super();
        this.state = { current_index: 0 };
    }
    componentDidMount() {
        if (this.props.analise.cenarios.length === 0) {
            this.addAba();
        }
    }

    setAba(i) {
        if (i < 0) {
            this.addAba();
        } else {
            this.setState({
                current_index: i,
            });
        }
    }

    addAba() {
        this.props.addConjunto();
        this.setState({});
    }

    render() {
        const cenarios = this.props.analise.cenarios;
        return (
            <div>
                <Tabs
                    activeKey={this.state.current_index}
                    onSelect={(k) => this.setAba(k)}
                    id="analisis-tabs"
                >
                    <Tab title="+ ADD" key={-1} eventKey={-1}></Tab>
                    {cenarios.map((c) => {
                        const n = c.nome;
                        const i = c.index;
                        return (
                            <Tab eventKey={i} title={n} key={i}>
                                <Cenario cenario={cenarios[i]} />
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    analise: state.praticas.analise,
});

export default connect(mapStateToProps, { addConjunto })(CenarioManager);
