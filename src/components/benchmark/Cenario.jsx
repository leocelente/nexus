import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import SingleCenario from "./SingleCenario";

export default class Cenario extends Component {
    static propTypes = {
        cenario: PropTypes.object,
    };

    render() {
        const { cenario } = this.props;
        if (cenario === undefined) {
            return <>No Data!</>;
        }
        return (
            <Card>
                <Card.Header style={{ color: "black" }}>
                    {cenario.nome}
                </Card.Header>
                <Card.Body>
                    <SingleCenario index={cenario.index} />
                </Card.Body>
            </Card>
        );
    }
}
