/**
 * Componente "depreciado" iria ser usado para mostrar a pontuação
 * de todas as praticas de um tema de acordo com os eixos do nexus
 * (agua, alimento, energia) mas está sendo pensada uma outra visualização
 */
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { connect } from "react-redux";
import { Atributo, Grupo, Indicador } from "../../api/models/indicador";
import { Pratica } from "../../api/models/pratica";
import { Propriedade } from "../../api/models/propriedade";
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
        ticks: { beginAtZero: true, suggestedMax: 1 },
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
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() - 1 };
    }
    setYear(/** @type {Number} */ year) {
        this.setState({ year });
    }
    render() {
        // lembrando que os indicadores são
        // organizados em grupos->atributos->indicadores
        const { grupos, graficos } = this.props;

        /** @type {Pratica} */
        const selected = this.props.selected;
        console.log(selected);
        /** @type {Array<Propriedade>} */
        const propriedades_all = this.props.propriedades;

        // Propriedades que aplicam a pratica 'selected'
        const propriedades = propriedades_all.filter((prop) => {
            const ns = prop.praticas.map((x) => x.nome);
            return ns.includes(selected.nome);
        });
        console.log(propriedades);
        const nomes = propriedades.map((x) => x.nome);

        if (graficos === undefined) return <></>;
        // if (selected.indicadores === undefined) return <></>;
        let avgs_ind = {};
        let avgs_att = {};
        let avgr = (/** @type {Array<Number>} */ xs) =>
            xs.length === 0 ? 0 : xs.reduce((a, x) => a + x, 0) / xs.length;
        // console.log(graficos);
        // inclui todos os indicadores
        grupos.forEach((/** @type {Grupo} */ grupo) => {
            grupo.atributos.forEach((/** @type {Atributo} */ atributo) => {
                // TODO: como é possivel isso ser undefined?
                atributo.indicadores.forEach(
                    (/** @type {Indicador} */ { nome }) => {
                        if (graficos[nome] === undefined) return;
                        const { byProp, min, max } = graficos[nome];
                        Array.from(
                            // filtra `byProp` do indicador pela variavel `propriedades`
                            Object.entries(byProp).filter((prop) =>
                                nomes.includes(prop[0])
                            )
                        ).forEach((kv) => {
                            // faz a normalização
                            byProp[kv[0]].forEach(({ valor }, i, a) => {
                                if (Object.entries(valor).length > 1) {
                                    valor = avgr(
                                        Object.entries(valor).map((x) => x[1])
                                    );
                                }
                                a[i].norm = (valor - min) / (max - min);
                            });
                        });

                        let norms = Object.entries(byProp)
                            .filter((prop) => nomes.includes(prop[0]))
                            .map((x) => x[1][0])
                            .map((x) => x.norm);
                        avgs_ind[nome] = avgr(norms);
                    }
                );
                let i_nomes = atributo.indicadores.map((x) => x.nome);
                let a = Object.entries(avgs_ind)
                    .filter((ind) => i_nomes.includes(ind[0]))
                    .map((x) => x[1]);
                avgs_att[atributo.nome] = avgr(a);
            });
        });
        /// build radar
        let ys = Object.entries(avgs_att).map((x) => x[1]);
        let labels = Object.entries(avgs_att).map((x) => x[0]);
        let dataset = makeDataset("Benchmarks", ys, 0);
        let data = {
            labels,
            datasets: [dataset],
        };
        //
        // constroi a tabela com indicadores normalizados
        // por propriedade (filtrada) e ano
        let tabela = {};
        Object.entries(graficos).forEach((kv_i) => {
            tabela[kv_i[0]] = [];
            const prop_kv = /* Array.from( */ Object.entries(kv_i[1].byProp) //
                // TODO: redundante: filtra novamente `byProp`
                .filter((prop) => {
                    return nomes.includes(prop[0]);
                });
            prop_kv.forEach((kv_p) => {
                tabela[kv_i[0]][kv_p[0]] = kv_i[1].byProp[kv_p[0]];
            });
        });

        return (
            <>
                <Radar data={data} options={options} />
                {Object.entries(tabela).map((kv) => {
                    const props = Object.entries(kv[1]);
                    const ele = props.map((kv_) => {
                        const points = kv_[1].sort((a, b) => a.tempo < b.tempo);
                        return (
                            <p>
                                {kv_[0]}:{" "}
                                {points.map((x) => (
                                    <>
                                        <br />
                                        <span>
                                            {x.tempo}:{" "}
                                            <u>{x.norm?.toFixed(4)}</u>
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
    }
}
const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    data: state.praticas.data,
    grupos: state.indicadores.grupos,
    selectedTema: state.praticas.selectedTema,
    selected: state.praticas.pratica,
    propriedades: state.propriedades.propriedades,
});

export default connect(mapStateToProps, null)(SimpleRadar);
