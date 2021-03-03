import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchPropriedades } from "../redux/actions/propriedadesActions";
import { fetchSerieHist } from "../redux/actions/indicadoresActions";

const colors = [
    "rgba(255, 99, 132, 0.75)",
    "rgba(54, 162, 235, 0.75)",
    "rgba(255, 206, 86, 0.75)",
    "rgba(75, 192, 192, 0.75)",
    "rgba(153, 102, 255, 0.75)",
    "rgba(255, 159, 64, 0.75)",
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

const emptySelection = (
    <>
        <h2>Selecione um Indicador</h2>
        <p style={{ color: "black" }}>
            Clique em um dos indicadores na lista para ver o historico do
            indicador nas propriedades
        </p>
    </>
);

class SimpleBar extends Component {
    componentDidMount() {
        this.props.fetchPropriedades();
        this.props.fetchSerieHist();
    }

    render() {
        if (this.props.selectedIndicador?.indicador?.nome === "") {
            return emptySelection;
        }
        let data = base;

        let graficos = {};
        this.props.serie.dados.forEach(({ indicador, data }) => {
            let { nome, titulo, unidade } = indicador;
            graficos[nome] = { series: [], titulo, unidade };
            data.forEach(({ valor, tempo, propriedade }) => {
                graficos[nome].series.push({
                    valor,
                    tempo,
                    propriedade: propriedade.nome,
                });
            });
        });

        let option = options;

        for (let indicador in graficos) {
            // TODO: Use Array.find()
            if (indicador == this.props.selectedIndicador.indicador.nome) {
                let { series, titulo, unidade } = graficos[indicador];
                setOptions(option, titulo, unidade);
                let datasets = [];
                let labels = [];
                series.forEach(({ valor, tempo, propriedade }) => {
                    let dset = datasets.findIndex(
                        ({ label }) => label == propriedade
                    );
                    if (dset === -1) {
                        datasets.push({ label: propriedade, data: [] });
                        dset = datasets.length - 1;
                    }
                    if (!labels.includes(tempo)) {
                        labels.push(tempo);
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

        return <Bar className="left-column" data={data} options={option} />;
    }
}

const mapStateToProps = (state) => ({
    serie: state.indicadores.serie,
    selectedIndicador: state.indicadores.selectedIndicador,
});

export default connect(mapStateToProps, { fetchPropriedades, fetchSerieHist })(
    SimpleBar
);
