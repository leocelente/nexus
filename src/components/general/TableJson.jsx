import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

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
