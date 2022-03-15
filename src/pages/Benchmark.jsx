import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import PageBase from "../components/general/PageBase";
import PraticasList from "../components/praticas/PraticasList";
import SelectTema from "../components/praticas/SelectTema";
import SimpleRadar from "../components/charts/_SimpleRadar";
import PropertyBar from "../components/benchmark/PropertyBar";
import AllPraticasList from "../components/benchmark/AllPraticasList";
import CenarioManager from "../components/benchmark/CenarioManager";
import BenchView from "../components/benchmark/BenchView";
/**
 * Página de benchmark está menos definida, em teoria mostraria o
 * grafico de como praticas se relacionam com indicadores [normalizados]. Mas
 * qual a forma dessa visualização ainda não está definido
 */
export default class Benchmark extends Component {
    render() {
        return (
            <div>
                <PageBase
                    left={
                        <div>
                            <BenchView />
                            <Card>
                                <span style={{ color: "#2e2e2e" }}>
                                    Dica: Cique nos items na legenda para
                                    esconder o cenário no gráfico
                                </span>
                            </Card>
                        </div>
                    }
                    right={
                        <>
                            <Card>
                                <Card.Title>
                                    <h4>Benchmarks</h4>
                                </Card.Title>
                                <Card.Text style={{ color: "black" }}>
                                    Realize comparações gráficas entre práticas
                                    do mesmo tema
                                </Card.Text>
                            </Card>
                            <br></br>
                            <CenarioManager />
                        </>
                    }
                />
            </div>
        );
    }
}
