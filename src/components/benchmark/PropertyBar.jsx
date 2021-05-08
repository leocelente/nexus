import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, ProgressBar } from "react-bootstrap";

/**
 * Wraper para o ProgresssBar do Bootstrap
 * candidato a ser usado para visualização dos
 * benchmarks
 */
export default class PropertyBar extends Component {
    static propTypes = {
        nome: PropTypes.string,
        valor: PropTypes.number,
    };

    render() {
        return (
            <Card style={{color: 'black'}}>
                <Card.Title><h4>{this.props.nome}</h4></Card.Title>
                <Card.Body>
                    <ProgressBar now={this.props.valor*100} label={this.props.valor}/>
                </Card.Body>
            </Card>
        );
    }
}
