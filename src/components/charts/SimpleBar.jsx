/**
 * Usado para visualizar os valores de um dado indicador
 * ao longo dos anos. Inicalmente cometi o erro de achar que
 * um indicador continha exatamente 1 numero, mas depois consertei
 * linhas [148:165] para que um indicador com um Object como conteudo
 * seja visualizado como um unico indicador com varios valores atrelados
 * -Celente
 */
import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";
import { fetchSerieHist } from "../../redux/actions/indicadoresActions";
import pattern from "patternomaly"; // Biblioteca para gerar padrões (quadradinhos)
// no grafico para criar um destaque
import { Col, Row, Dropdown, ButtonGroup } from "react-bootstrap";
import Graph from "../general/Graph";

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

// Se ver esses valores ao não deu certo
const base = {
    labels: [2024, 2025, 2026],
    datasets: [
        {
            label: "Propriedade X",
            data: [-10, 20, -40],
        },
    ],
};
/**
 *
 * @param {String} label
 * @param {Array} data
 * @param {Number} index
 * @returns Created ChartJS dataset with `label` as title
 * and `data` as values
 */
function makeDataset(label, data, index) {
    if (label.startsWith("Sítio São João")) {
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
    componentDidMount() {
        this.props.fetchPropriedades();
        this.props.fetchSerieHist();
    }

    render() {
        if (this.props.selected?.indicador?.nome === "") {
            return emptySelection;
        }
        if (this.props.graficos === undefined) return <></>;

        let data = base;
        const { graficos } = this.props;

        // parte da options inicial
        let option = options;
        // encontra nos dados vindos do banco (graficos),
        // o indicador com o nome do selecionado (selected.indicador)
        const { nome } = this.props.selected.indicador;
        const result = Object.entries(graficos).find((a) => a[0] === nome);
        if (result === undefined) return <></>;
        const indicador = result[1];

        // com as informações desse indicador constroi as opções
        // para a biblioteca ChartJS
        const { series, titulo, unidade } = indicador;
        setOptions(option, titulo, unidade);

        // Ordena os valores de acordo com ano e secundariamente
        // de acordo com a propriedade
        series.sort((a, b) => {
            if (a.tempo !== b.tempo) return a.tempo > b.tempo;
            else return a.propriedade > b.propriedade;
        });

        let datasets = [];
        let labels = [];

        // Constroi o array com o eixo x, isso é importante
        // pois o valor de Y deve ser injetado no index especifico
        // para correlacionar com o eixo X
        series.forEach(({ tempo }) => {
            if (!labels.includes(tempo)) {
                labels.push(tempo);
            }
        });

        // constroi 'datasets' que contem os data(eixo y) e os labels(eixo x)
        // para o grafico
        series.forEach(({ valor, tempo, propriedade }) => {
            let dset = datasets.findIndex(({ label }) => label === propriedade);
            if (dset === -1) {
                datasets.push({ label: propriedade, data: [] });
                dset = datasets.length - 1;
                labels.forEach((_, i) => (datasets[dset].data[i] = 0));
            }
            datasets[dset].data[labels.indexOf(tempo)] = valor;
        });
        // Transforma os dados que contem multiplos valores (indicadores cujos
        // dados são objetos), em multiplas entradas (variantes) em um objeto
        // [ "indicador (variante): dados"]
        let singleDataByPropriedade = {};
        datasets.forEach((prop, i) => {
            prop.data.forEach((point, j) => {
                if (
                    prop.data.length !== 0 &&
                    Object.entries(prop.data[0]).length > 0
                ) {
                    // identifica a variante no objeto com a chave formada por:
                    // "Indicador  (Variante)", eg: Producao (Animal) e Producao (Vegetal)"
                    Object.entries(point).forEach((val, k) => {
                        let t = prop.label + " (" + val[0] + ")";
                        if (!singleDataByPropriedade[t])
                            singleDataByPropriedade[t] = [];
                        singleDataByPropriedade[t].push(val[1]);
                    });
                } else {
                    // Caso não tenha variantes usa "Indicador": dados
                    if (!singleDataByPropriedade[prop.label])
                        singleDataByPropriedade[prop.label] = [];
                    singleDataByPropriedade[prop.label] = prop.data;
                }
            });
        });
        data.labels = labels;
        data.datasets = Object.entries(singleDataByPropriedade).map((kv, i) => {
            return makeDataset(kv[0], kv[1], i);
        });

        return (
            // Para o futuro, seria bom ter como selecionar entre a visualização
            // em barras ou em linha.
            <Col>
                <Dropdown title="Gráfico" as={ButtonGroup} size="sm">
                    <Dropdown.Item eventKey="0">Barras</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Linha</Dropdown.Item>
                </Dropdown>
                <Bar className="left-column" data={data} options={option} />
            </Col>
            // <Graph data={data} option={option} />
        );
    }
}

const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    selected: state.indicadores.selectedIndicador,
});

export default connect(mapStateToProps, { fetchPropriedades, fetchSerieHist })(
    SimpleBar
);
