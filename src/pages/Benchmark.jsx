import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import PageBase from "../components/general/PageBase";
import PraticasList from "../components/praticas/PraticasList";
import SelectTema from "../components/praticas/SelectTema";
import SimpleRadar from "../components/charts/SimpleRadar";
import PropertyBar from "../components/benchmark/PropertyBar";

export default class Benchmark extends Component {
    render() {
        return (
            <div>
                <PageBase
                    left={
                        <>
                            <SimpleRadar />
                            <Card>
                                <span style={{ color: "#2e2e2e" }}>
                                    Dica: Cique nos items na legenda para
                                    esconder a pratica no gráfico
                                </span>
                            </Card>
                            <PropertyBar nome="Propriedade" valor={0.75} />
                            <PropertyBar nome="Propriedade" valor={0.25} />
                            <PropertyBar nome="Propriedade" valor={0.5} />

                        </>
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
                            <SelectTema />
                            <br></br>
                            <PraticasList />
                            {/*<IndicadoresList /> */}
                        </>
                    }
                />
            </div>
        );
    }
}
