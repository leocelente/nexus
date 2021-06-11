import React, { Component } from "react";
import { Card } from "react-bootstrap";
import GrupoAtributo from "../components/indicadores/GrupoAtributo";
import IndicadoresList from "../components/indicadores/IndicadoresList";
import PageBase from "../components/general/PageBase";
import SimpleBar from "../components/charts/SimpleBar";
import VariantBar from "../components/charts/VariantBar";

/**
 * Pagina dos Indicadores, duas colunas uma com os graficos e outra com
 * as opções para selecionar o Grupo e Atributo dentro do GRupo e finalmente o
 * Indicador numa lista
 */
export default class Indicadores extends Component {
    render() {
        return (
            <div>
                <PageBase
                    left={<SimpleBar />}
                    extra={<VariantBar />}
                    right={
                        <div>
                            <Card>
                                <Card.Title>
                                    <h4>Primeiro Passo</h4>
                                </Card.Title>
                                <Card.Text style={{ color: "black" }}>
                                    Acesse indicadores NEXUS para fazer
                                    comparações entre diferentes propriedades
                                </Card.Text>
                            </Card>
                            <br></br>
                            <GrupoAtributo />
                            <br></br>
                            {/* <List items={indicadores} title="Indicadores" /> */}
                            <IndicadoresList />
                        </div>
                    }
                />
            </div>
        );
    }
}
