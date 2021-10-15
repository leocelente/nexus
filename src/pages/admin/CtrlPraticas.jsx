import React, { Component } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Propriedade } from "../../api/models/propriedade";

export default class CtrlPraticas extends Component {
    static propTypes = {
        propriedade: Propriedade,
    };

    render() {
        const { propriedade } = this.props;
        const { praticas } = propriedade;
        console.log(praticas);
        return (
            <div>
                <h4>Tema:</h4>
                <Table variant="sm">
                    <tr>
                        <th>Pratica</th>
                        <th>Tempos</th>
                    </tr>
                    {praticas.map((uso) => {
                        return (
                            <tr>
                                <td>{uso.pratica.nome}</td>
                                <td>{uso.tempos.join(", ")}</td>
                            </tr>
                        );
                    })}
                </Table>
            </div>
        );
    }
}
