/**
 * Usado para visualizar os valores de um dado indicador
 * ao longo dos anos. Inicalmente cometi o erro de achar que
 * um indicador continha exatamente 1 numero, mas depois consertei
 * linhas [148:165] para que um indicador com um Object como conteudo
 * seja visualizado como um unico indicador com varios valores atrelados
 * -Celente
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bar, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";
import {
    fetchSerieHist,
    selectIndicador,
} from "../../redux/actions/indicadoresActions";

import pattern from "patternomaly"; // Biblioteca para gerar padrões (quadradinhos)
// no grafico para criar um destaque
import { Spinner } from "react-bootstrap";

/* Padroniza as cores vistas. Ainda não funciona corretamente
    devido as multiplas renderizações do react.
*/
const colors = [
    "rgba(255, 99, 132, 0.25)",
    "rgba(54, 162, 235, 0.25)",
    "rgba(255, 206, 86, 0.25)",
    "rgba(75, 192, 192, 0.25)",
    "rgba(153, 99, 255, 0.25)",
    "rgba(255, 159, 64, 0.25)",
];

// Se ver esses valores ao não deu certo

/**
 *
 * @param {String} label
 * @param {Array} data
 * @param {Number} index
 * @returns Created ChartJS dataset with `label` as title
 * and `data` as values
 */
function makeDataset(label, data, index, prop) {
    console.log(prop);
    if (label.startsWith(prop)) {
        return {
            label,
            data,
            // backgroundColor: /*pattern.draw("square",*/ "rgba(0,0,0,0.2)"/*)*/,
            borderColor: "rgba(0,0,0,0.8)",
            borderWidth: 4,
        };
    } else
        return {
            label,
            data,
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            borderWidth: 1,
        };
}

function setOptions(option, titulo, unidades) {
    option.title.text = titulo;
    option.scales.yAxes[0].scaleLabel.labelString = unidades;
}

/**
 * Conteudo a ser mostrado caso não haja valoers associados
 * a esse indicador
 */
const emptySelection = (
    <>
        <h2>Selecione um Indicador</h2>
        <p style={{ color: "black" }}>
            Selecione um grupo e um atributo ao lado para ver os indicadores
            disponíveis. Clique então em um indicador na lista para ver os dados
            das propriedades.
        </p>
    </>
);
class SimpleBar extends Component {
    static propTypes = {
        transposed: PropTypes.bool,
    };
    static defaultProps = {
        transposed: false,
    };
    componentDidMount() {
        if (!this.props.transposed) {
            this.props.fetchSerieHist();
        }

        // debugger;
        console.log(this.props.graficos);
        if (this.props.graficos !== null) {
            console.log("Could display data!");
            // debugger;
            console.log(this.props.selected?.indicador);
            if (!this.props.selected?.indicador) {
                const top_indicador = this.props.grupos[0].atributos[0];
                this.props.selectIndicador(top_indicador);
            }
        }
    }

    render() {
        if (this.props.wait) {
            return <span color={"black"}>Requisitando Dados...</span>;
        }
        const options = {
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Old",
                        },
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
            title: {
                display: true,
                text: "Some Title",
                fontSize: 16,
            },
            legend: {
                display: true,
                position: "bottom",
            },
            mode: "index",
            responsive: true,
        };

        const base = {
            labels: [2024, 2025, 2026],
            datasets: [
                {
                    label: "Propriedade X",
                    data: [-10, 20, -40],
                },
            ],
        };
        if (this.props.selected?.indicador?.nome === "") {
            if (this.props.transposed) return <></>;
            return emptySelection;
        }

        if (this.props.graficos === undefined) {
            // return Preparando os Dados...;
            return (
                <p color="black" align="center">
                    <Spinner animation="border" variant="secondary" />
                </p>
            );
        }
        let data = base;
        const { graficos } = this.props;

        // parte da options inicial
        let option = options;

        // encontra nos dados vindos do banco (graficos),
        // o indicador com o nome do selecionado (selected.indicador)
        if (!this.props.selected.indicador) {
            return <></>;
        }
        const { nome } = this.props.selected.indicador;
        const result = [...graficos.entries()].find((a) => a[0] === nome);
        if (result === undefined) return <></>;
        const indicador = result[1];

        // com as informações desse indicador constroi as opções
        // para a biblioteca ChartJS
        const { titulo, unidade } = indicador;
        setOptions(option, titulo, unidade);

        // Ordena os valores de acordo com ano e secundariamente
        // de acordo com a propriedade
        let sorter;
        if (this.props.transposed) {
            sorter = (a, b) => {
                if (a.propriedade !== b.propriedade)
                    return a.propriedade > b.propriedade;
                else return a.tempo - b.tempo;
            };
        } else {
            sorter = (a, b) => {
                if (a.tempo !== b.tempo) return a.tempo - b.tempo;
                else return a.propriedade > b.propriedade;
            };
        }
        const lista_dados_por_propriedade = Object.values(
            graficos.get(nome).byProp
        );

        const years = new Set(
            Object.values(lista_dados_por_propriedade)
                .flat()
                .sort(sorter)
                .map((x) => x.tempo)
        );
        let lista_propriedades = Object.keys(graficos.get(nome).byProp);

        let values = lista_dados_por_propriedade.map((dados) =>
            dados.sort(sorter).map(({ valor }) => valor)
        );
        const variantes_indicadores = new Set();
        const variantes_dados = [];
        if (values.flat().some((x) => Object.keys(x).length > 0)) {
            lista_dados_por_propriedade.forEach((prop) => {
                prop.forEach((dado) => {
                    Object.keys(dado.valor).forEach((ponto) => {
                        const text = dado.propriedade.nome + " (" + ponto + ")";
                        variantes_indicadores.add(text);
                        const index = Array.from([
                            ...variantes_indicadores,
                        ]).indexOf(text);
                        if (variantes_dados[index] === undefined) {
                            variantes_dados[index] = [];
                        }
                        variantes_dados[index].push(dado.valor[ponto]);
                    });
                });
            });
            lista_propriedades = [...variantes_indicadores];
            values = variantes_dados;
        }

        let dsts;
        if (this.props.transposed) {
            let transpose = (matrix) =>
                matrix[0].map((_, i) => matrix.map((x) => x[i]));
            values = transpose(values);
            const anos = [...years];
            dsts = anos.map((n, i) =>
                makeDataset(String(n), values[i], i, this.props.atual)
            );
            data.labels = [...lista_propriedades];
            data.datasets = dsts;
        } else if (this.props.transposed === false) {
            dsts = lista_propriedades.map((n, i) =>
                makeDataset(n, values[i], i, this.props.atual)
            );

            data.labels = [...years];
            data.datasets = dsts;
        }

        return <Bar className="left-column" data={data} options={option} />;
    }
}

const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    selected: state.indicadores.selectedIndicador,
    grupos: state.indicadores.grupos,
    wait: state.admin.wait,
    atual: state.authentication.temporary_propriedade,
});

export default connect(mapStateToProps, {
    fetchPropriedades,
    fetchSerieHist,
    selectIndicador,
})(SimpleBar);
