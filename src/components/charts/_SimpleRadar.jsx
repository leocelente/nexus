/**
 * Componente "depreciado" iria ser usado para mostrar a pontuação
 * de todas as praticas de um tema de acordo com os eixos do nexus
 * (agua, alimento, energia) mas está sendo pensada uma outra visualização
 */
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { connect } from "react-redux";
import { Analise, Cenario } from "../../api/models/conjunto";
import { Atributo, Grupo, Indicador } from "../../api/models/indicador";
import { Pratica } from "../../api/models/pratica";
import { Propriedade } from "../../api/models/propriedade";
import PropTypes from "prop-types";

const colors = [
    "rgba(255, 99, 132, 0.35)",
    "rgba(54, 162, 235, 0.35)",
    "rgba(255, 206, 86, 0.35)",
    "rgba(75, 192, 192, 0.35)",
    "rgba(153, 99, 255, 0.35)",
    "rgba(255, 159, 64, 0.35)",
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
        borderWidth: 5,
    };
}

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
    static propTypes = {
        level: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() - 1 };
    }

    setYear(/** @type {Number} */ year) {
        this.setState({ year });
    }

    buildData(grupos, graficos, conjunto_praticas, propriedades_all) {
        const base = {
            labels: ["Agua", "Alimento", "Energia"],
            datasets: [makeDataset("Test", [10, 3, 4], 0)],
        };

        let avgr = (/** @type {Array<Number>} */ xs) =>
            xs.length === 0 ? 0 : xs.reduce((a, x) => a + x, 0) / xs.length;

        // Propriedades que aplicam a pratica 'selected'
        const propriedades = propriedades_all.filter((propriedade) => {
            const praticas_aplicadas = propriedade.praticas.map(
                ({ pratica }) => pratica.nome
            );
            return conjunto_praticas.some((selecionada) =>
                praticas_aplicadas.includes(selecionada)
            );
        });

        let valid_years = {};
        Object.entries(propriedades).forEach((kv) => {
            const ps = kv[1]?.praticas;
            valid_years[kv[1].nome] = {};
            Object.entries(ps).forEach((p) => {
                if (p[1].tempos !== undefined)
                    valid_years[kv[1].nome][p[1].pratica.nome] = p[1].tempos;
                else valid_years[kv[1].nome][p[1].pratica.nome] = [];
            });
        });

        const nomes = propriedades.map((x) => x.nome);
        if (graficos === undefined) return <></>;
        let avgs_ind = {};
        let avgs_att = {};
        let avgs_grupo = {};

        let filter_years = (propriedade) => {
            let all_years = Object.entries(valid_years[propriedade])
                .filter((kv_pratica) =>
                    conjunto_praticas.includes(kv_pratica[0])
                )
                .map((x) => x[1])[0];
            let years = new Set(all_years);
            return [...years];
        };
        let view = {};
        // inclui todos os indicadores
        grupos.forEach((/** @type {Grupo} */ grupo) => {
            grupo.atributos.forEach((/** @type {Atributo} */ atributo) => {
                // TODO: como é possivel isso ser undefined?
                atributo.indicadores.forEach(
                    (/** @type {Indicador} */ { nome }) => {
                        if (graficos.get(nome) === undefined) return;
                        const { byProp, min, max } = graficos.get(nome);
                        view[nome] = byProp;
                        Array.from(
                            // filtra `byProp` do indicador pela variavel `propriedades`
                            Object.keys(byProp).filter((x) => nomes.includes(x))
                        ).forEach((prop, i, a) => {
                            // faz a normalização
                            const used_years = filter_years(prop);
                            // valid_years[prop][pratica_selecionada.nome];
                            byProp[prop]
                                .filter(({ tempo }) =>
                                    used_years.includes(tempo)
                                )
                                .forEach(({ valor }, i, a) => {
                                    if (Object.entries(valor).length > 1) {
                                        const vs = Object.values(valor);
                                        const m = Math.min(...vs);
                                        const dm = Math.max(...vs) - m;
                                        const norm = (x) => (x - m) / dm;
                                        valor = avgr(vs.map(norm));
                                    }
                                    a[i].norm = (valor - min) / (max - min);
                                });
                        });

                        let norms = Object.entries(byProp)
                            .filter((prop) => nomes.includes(prop[0]))
                            .filter((kv) => {
                                return filter_years(kv[0]).includes(
                                    kv[1][0].tempo
                                );
                            })
                            .map((x) => x[1][0])
                            .map((x) => x.norm);
                        avgs_ind[nome] = avgr(norms);
                    }
                );
                let i_nomes = atributo.indicadores.map((x) => x.nome);
                let a = Object.entries(avgs_ind)
                    .filter((ind) => i_nomes.includes(ind[0]))
                    .map((x) => x[1]);
                avgs_att[atributo.nome] = Math.max(...a);
                // avgs_att[atributo.nome] = avgr([...a]);
            });
            let a_nomes = grupo.atributos.map((x) => x.nome);
            let b = Object.entries(avgs_att)
                .filter((att) => a_nomes.includes(att[0]))
                .map((x) => x[1]);
            avgs_grupo[grupo.nome] = Math.max(...b);
        });

        /// build radar
        let values;
        let labels;
        switch (this.props.level) {
            case "grupo":
                values = Object.values(avgs_grupo);
                labels = Object.keys(avgs_grupo);
                break;
            default:
            case "atributo":
                values = Object.values(avgs_att);
                labels = Object.keys(avgs_att);
                break;
        }

        return { labels, values };
    }

    render() {
        // lembrando que os indicadores são
        // organizados em grupos->atributos->indicadores
        const { grupos, graficos } = this.props;

        let cenario_data = new Map();

        /** @type {Array<Cenario>} */
        const cenarios = this.props.cenarios;
        cenarios.forEach(({ nome, praticas }) =>
            cenario_data.set(nome, praticas)
        );

        /** @type {Array<Propriedade>} */
        const propriedades_all = this.props.propriedades;

        let datasets = [];
        let labels = [];

        cenarios.forEach((cenario) => {
            const points = this.buildData(
                grupos,
                graficos,
                cenario_data.get(cenario.nome),
                propriedades_all
            );
            if (points?.labels !== undefined) {
                datasets.push(
                    makeDataset(cenario.nome, points.values, cenario.index)
                );
                labels = points.labels;
            }
        });
        let data = {
            labels,
            datasets,
        };

        return <Radar data={data} options={options} />;
    }
}
const mapStateToProps = (state) => ({
    cenarios: state.praticas.analise.cenarios,
    graficos: state.indicadores.graficos,
    grupos: state.indicadores.grupos,
    selected: state.praticas.pratica,
    conjunto: state.praticas.conjunto,
    propriedades: state.propriedades.propriedades,
});

export default connect(mapStateToProps, null)(SimpleRadar);
