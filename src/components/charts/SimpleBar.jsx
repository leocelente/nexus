import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { fetchPropriedades } from "../../redux/actions/propriedadesActions";
import { fetchSerieHist } from "../../redux/actions/indicadoresActions";

const colors = [
    "rgba(255, 99, 132, 0.75)",
    "rgba(54, 162, 235, 0.75)",
    "rgba(255, 206, 86, 0.75)",
    "rgba(75, 192, 192, 0.75)",
    "rgba(153, 99, 255, 0.75)",
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

const base = {
    labels: [2024, 2025, 2026],
    datasets: [
        {
            label: "Propriedade X",
            data: [-10, 20, -40],
        },
    ],
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

        let option = options;
        const { nome } = this.props.selected.indicador;
        const result = Object.entries(graficos).find((a) => a[0] === nome);
        if (result === undefined) return <></>;

        const indicador = result[1];
        const { series, titulo, unidade } = indicador;
        setOptions(option, titulo, unidade);

        series.sort((a, b) => {
            if (a.tempo !== b.tempo) return a.tempo > b.tempo;
            else return a.propriedade > b.propriedade;
        });

        let datasets = [];
        let labels = [];

        series.forEach(({ valor, tempo, propriedade }) => {
            let dset = datasets.findIndex(({ label }) => label === propriedade);
            if (dset === -1) {
                datasets.push({ label: propriedade, data: [] });
                dset = datasets.length - 1;
            }
            if (!labels.includes(tempo)) {
                labels.push(tempo);
            }
            datasets[dset].data.push(valor);
        });
        data.datasets = datasets.map((x, i) => makeDataset(x.label, x.data, i));
        data.labels = labels;

        return <Bar className="left-column" data={data} options={option} />;
    }
}

const mapStateToProps = (state) => ({
    graficos: state.indicadores.graficos,
    selected: state.indicadores.selectedIndicador,
});

export default connect(mapStateToProps, { fetchPropriedades, fetchSerieHist })(
    SimpleBar
);
