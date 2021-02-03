import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class TableJson extends Component {
  render() {
    const data = { key: "value", k2: "v1" };
    return (
      <div>
        <Table size="sm">
          <tbody>
            {Object.entries(this.props.data).map((elem) => (
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
