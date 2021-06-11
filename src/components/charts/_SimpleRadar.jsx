/**
 * Componente "depreciado" iria ser usado para mostrar a pontuação
 * de todas as praticas de um tema de acordo com os eixos do nexus
 * (agua, alimento, energia) mas está sendo pensada uma outra visualização
 */
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { connect } from "react-redux";
import PropertyBar from "../benchmark/PropertyBar";
import TableJson from "../general/TableJson";

const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 99, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
];

// Cria um dataset para a biblioteca ChartJs com o
// nome label e dados data, o index é utilizado para selecionar
// uma cor dos valores acima
function makeDataset(label, data, index) {
    return {
        label,
        data,
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 1,
    };
}

const base = {
    labels: ["Agua", "Alimento", "Energia"],
    datasets: [makeDataset("Test", [10, 3, 4], 0)],
};

const options = {
    scale: {
        ticks: { beginAtZero: true, suggestedMax: 10 },
        gridLines: {
            color: "rgba(0, 0, 0, 0.36)",
        },
    },
    legend: {
        position: "bottom",
    },
    title: {
        text: "Benchmark",
        display: false,
        fullWidth: true,
        fontSize: 20,
        position: "top",
    },
    responsive: true,
};

class SimpleRadar extends Component {
    render() {
        // lembrando que os indicadores são
        // organizados em grupos->atributos->indicadores
        const { grupos, graficos } = this.props;
        if (graficos === undefined) return <></>;
        grupos.forEach((indicador) => {
            indicador.atributos.forEach((atributo) => {
                atributo.indicadores.forEach(({ nome }) => {
                    if (graficos[nome] === undefined) return;
                    let { byProp, min, max } = graficos[nome];
                    Array.from(Object.entries(byProp)).forEach((kv) => {
                        byProp[kv[0]].forEach(({ valor }, i, a) => {
                            a[i].norm = (valor - min) / (max - min);
                        });
                    });
                });
            });
        });
        console.log(graficos);
        let tabela = {};
        let indicadores_kv = Array.from(Object.entries(graficos));
        indicadores_kv.forEach((kv_i) => {
            tabela[kv_i[0]] = [];
            let prop_kv = Array.from(Object.entries(kv_i[1].byProp));
            prop_kv.forEach((kv_p) => {
                tabela[kv_i[0]][kv_p[0]] = kv_i[1].byProp[kv_p[0]].map(
                    ({ norm, tempo }) => ({ norm, tempo })
                );
            });
        });

        return (
            <>
                {Object.entries(tabela).map((kv) => {
                    const props = Object.entries(kv[1]);
                    let ele = props.map((kv_) => {
                        let points = kv_[1];
                        return (
                            <p>
                                {kv_[0]}:{" "}
                                {points.map((x) => (
                                    <>
                                        <br />
                                        <span>
                                            {x.tempo}:{" "}
                                            <u>{x.norm.toFixed(4)}</u>
                                            {/* <PropertyBar
                                                nome={x.tempo}
                                                valor={x.norm.toFixed(4)}
                                            /> */}
                                        </span>
                                    </>
                                ))}
                            </p>
                        );
                    });
                    return (
                        <Card style={{ color: "black" }}>
                            <Card.Title>
                                <h5>{kv[0]}</h5>
                            </Card.Title>
                            {ele}
                        </Card>
                    );
                })}
            </>
        );
        // let graph = base;
        // const { praticas } = this.props.data.temas[this.props.selectedTema];
        // graph.datasets = praticas.map((pratica, index) => {
        //     const { agua, alimento, energia } = pratica.benchmark;
        //     return makeDataset(pratica.nome, [agua, alimento, energia], index);
        // });
        // return <Radar data={graph} options={options} />;
    }
}
const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    data: state.praticas.data,
    grupos: state.indicadores.grupos,
    selectedTema: state.praticas.selectedTema,
});

export default connect(mapStateToProps, null)(SimpleRadar);
