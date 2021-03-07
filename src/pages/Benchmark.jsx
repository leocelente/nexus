import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import IndicadoresList from "../components/IndicadoresList";
import PageBase from "../components/PageBase";
import PraticasList from "../components/PraticasList";
import SelectTema from "../components/SelectTema";
import SimpleRadar from "../components/SimpleRadar";
import RadarContainer from "../components/RadarContainer";

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
                            {/* <Row className="justify-content-center"> */}
                                
                            {/* </Row> */}
                        </>
                    }
                    extra={
                        <RadarContainer />
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
