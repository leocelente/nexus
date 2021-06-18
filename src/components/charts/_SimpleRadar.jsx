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

        /** @type {Pratica} */
        const selected = this.props.selected;

        /** @type {Array<Propriedade>} */
        const propriedades_all = this.props.propriedades;

        // Propriedades que aplicam a pratica 'selected'
        const propriedades = propriedades_all.filter((prop) => {
            const ns = prop.praticas.map((x) => x.nome);
            return ns.includes(selected.nome);
        });

        const nomes = propriedades.map((x) => x.nome);

        if (graficos === undefined) return <></>;
        // inclui todos os indicadores
        grupos.forEach((indicador) => {
            indicador.atributos.forEach((atributo) => {
                // TODO: como é possivel isso ser undefined?
                if (selected.indicadores === undefined) return <></>;
                atributo.indicadores.forEach(({ nome }) => {
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
                            a[i].norm = (valor - min) / (max - min);
                        });
                    });
                });
            });
        });

        grupos.forEach((/** @type {Grupo} */ grupo) => {
            let media_grupo = {};
            grupo.atributos.forEach((/** @type {Atributo} */ atributo) => {
                // TODO: como é possivel isso ser undefined?
                if (selected.indicadores === undefined) return <></>;
                let media_atributo = {};
                atributo.indicadores.forEach(
                    (/** @type {Indicador} */ { nome }) => {
                        if (graficos[nome] === undefined) return;
                        Object.entries(graficos[nome].byProp)
                            .filter((prop) => nomes.includes(prop[0]))
                            .forEach((prop) => {
                                /** @type {Array} */
                                const data = prop[1];
                                // console.log(data);
                                media_atributo[prop[0]] = data.reduce(
                                    (acc, x) => acc + x.norm,
                                    0
                                );
                            });
                        // console.log(nome);
                    }
                );
                // console.log("media_atributo", atributo.nome, media_atributo);
                Object.entries(media_atributo).forEach((avg_att) => {
                    if (!Number.isNaN(avg_att[1]))
                        media_grupo[avg_att[0]] += avg_att[1];
                });
                Object.entries(media_atributo).forEach((avg_att) => {
                    media_grupo[avg_att[0]] /= grupo.atributos.length;
                });
            });
            // console.log("media_grupo", grupo.nome, media_grupo);
        });

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
