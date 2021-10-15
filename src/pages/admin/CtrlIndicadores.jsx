import React, { Component } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Propriedade } from "../../api/models/propriedade";
import { connect } from "react-redux";

export class CtrlIndicadores extends Component {
    static propTypes = {
        propriedade: Propriedade,
    };

    render_atributo(atributo) {}

    render_indicador(indicador_value) {
        if (indicador_value === undefined) return <></>;
        console.log(indicador_value.byProp[this.props.propriedade.nome]);
        let data = indicador_value.byProp[this.props.propriedade.nome];
        if (data === undefined) {
            data = [];
            return (
                <tr>
                    <td>{data.length}</td>
                </tr>
            );
        }
        // console.log(data.length);
        return data.map((ponto) => {
            <tr>
                <td>{indicador_value.titulo}</td>
                <td>{ponto.tempo}</td>
                <td>{ponto.valor}</td>
            </tr>;
        });
        return;
    }

    render() {
        const { propriedade, graficos, grupos } = this.props;
        function mapEntriesToString(entries) {
            return (
                Array.from(entries, ([k, v]) => `\n  ${k}: ${v}`).join("") +
                "\n"
            );
        }
        console.log("graficos");
        console.log(graficos);

        return (
            <div>
                {grupos.map((grupo) => {
                    return (
                        <>
                            <h4>Grupo:{grupo.nome}</h4>
                            {grupo.atributos.map((atributo) => {
                                return (
                                    <>
                                        <h5>Atributo:{atributo.nome}</h5>
                                        <Table variant="sm">
                                            {atributo.indicadores.map(
                                                (indicador) => {
                                                    return (
                                                        <>
                                                            {this.render_indicador(
                                                                graficos.get(
                                                                    indicador.nome
                                                                )
                                                            )}
                                                        </>
                                                    );
                                                }
                                            )}
                                        </Table>
                                    </>
                                );
                            })}
                        </>
                    );
                })}
                {/* <h5>Atributo:</h5>
                    <tr>
                        <th>Indicador</th>
                        <th>Valor</th>
                    </tr>
                </Table> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    grupos: state.indicadores.grupos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CtrlIndicadores);
