import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";
import { fetchSerieHist } from "../../redux/actions/indicadoresActions";
import { ButtonGroup, Col, Dropdown } from "react-bootstrap";
import SimpleBar from "./SimpleBar";

/**
 * Repetição de código. Faz a mesma coisa do que o grafico de barras normal
 * mas altera a função de ordenação. Faz com que o eixo x agrupe por propriedade
 * depois por ano
 */

const colors = [
    "rgba(255, 159, 64, 0.75)",
    "rgba(153, 102, 255, 0.75)",
    "rgba(75, 192, 192, 0.75)",

    "rgba(255, 99, 132, 0.75)",
    "rgba(54, 162, 235, 0.75)",
    "rgba(255, 206, 86, 0.75)",
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
    responsive: true,
};

function makeDataset(label, data, index) {
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

const base = {
    labels: [2024, 2025, 2026],
    datasets: [
        {
            label: "Propriedade X",
            data: [-10, 20, -40],
        },
    ],
};

const emptySelection = <></>;

class VariantBar extends Component {
    componentDidMount() {
        this.props.fetchPropriedades();
        this.props.fetchSerieHist();
    }

    render() {
        // return (
        //     <SimpleBar
        //         orderBy={(a, b) => {
        //             if (a.propriedade !== b.propriedade)
        //                 return a.propriedade > b.propriedade;
        //             else return a.tempo > b.tempo;
        //         }}
        //     />
        // );
        // }
        // }
        if (this.props.selected?.indicador?.nome === "") {
            return emptySelection;
        }

        let data = base;
        let { graficos } = this.props;
        let option = options;
        for (let indicador in graficos) {
            // TODO: Use Array.find()
            if (indicador == this.props.selected.indicador.nome) {
                let { series, titulo, unidade } = graficos[indicador];
                setOptions(option, titulo, unidade);
                series.sort((a, b) => {
                    if (a.propriedade !== b.propriedade)
                        return a.propriedade > b.propriedade;
                    else return a.tempo > b.tempo;
                });
                let datasets = [];
                let labels = [];
                series.forEach(({ valor, tempo, propriedade }) => {
                    let dset = datasets.findIndex(
                        ({ label }) => label == tempo
                    );
                    if (dset === -1) {
                        datasets.push({ label: tempo, data: [] });
                        dset = datasets.length - 1;
                    }
                    if (!labels.includes(propriedade)) {
                        labels.push(propriedade);
                    }
                    datasets[dset].data.push(valor);
                });
                data.datasets = datasets.map((x) =>
                    makeDataset(x.label, x.data, datasets.indexOf(x))
                );
                data.labels = labels;
                break;
            }
        }

        return (
            <Col>
                <Dropdown title="Gráfico" as={ButtonGroup} size="sm">
                    <Dropdown.Item eventKey="0">Barras</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Linha</Dropdown.Item>
                </Dropdown>
                <Bar className="left-column" data={data} options={option} />
            </Col>
        );
    }
}

const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    selected: state.indicadores.selectedIndicador,
});

export default connect(mapStateToProps, { fetchPropriedades, fetchSerieHist })(
    VariantBar
);
