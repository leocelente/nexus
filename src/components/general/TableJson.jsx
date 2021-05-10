import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
/**
 * Constroi uma tabela HTML com base em um elemento JSON
 * A coluna da esquerda são as keys e da direita os valores:
 * 
 * { 
 *    "A": 1,
 *    "B": 2,
 * } vira
 * ._____.
 * |A |1 |
 * +-----+
 * |B |2 |
 */
export default class TableJson extends Component {
    static propTypes = {
        data: PropTypes.any
    };

    render() {
        return (
            <div>
                <Table size="sm" bordered>
                    <thead></thead>
                    <tbody>
                        {Object.entries(this.props.data).sort().map((elem) => (
                            <tr>
                                <td>{elem[0]}:</td>
                                <td>{elem[1]}</td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
