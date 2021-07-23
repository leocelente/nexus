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
        data: PropTypes.any,
    };

    render() {
        let rm_accent = (str) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        return (
            <div>
                <Table size="sm" bordered>
                    <thead></thead>
                    <tbody>
                        {Object.entries(this.props.data)
                            .sort((a, b) => {
                                const x = rm_accent(a[0]);
                                const y = rm_accent(b[0]);
                                return x > y;
                            })
                            .map((elem, i) => (
                                <tr key={i}>
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
