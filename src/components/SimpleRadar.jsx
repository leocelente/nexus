import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import { connect } from "react-redux";

const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 99, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
];

let count = 0;
function makeDataset(label, data) {
    return {
        label,
        data,
        backgroundColor: colors[count % colors.length],
        borderColor: colors[count++ % colors.length],
        borderWidth: 1,
    };
}

const base = {
    labels: ["Agua", "Alimento", "Energia"],
    datasets: [
        makeDataset("Test", [10, 3, 4]),
        makeDataset("Test3", [2, 2, 6]),
    ],
};
const options = {
    scale: {
        ticks: { beginAtZero: true, suggestedMax: 10 },
        gridLines: {
            color: "rgba(0, 0, 0, 0.5)",
        },
    },
    legend: {
        position: "bottom",
    },
    title: {
        text: "Benchmark",
        display: false,
        fullWidth: true,
        fontSize: 24,
        position: "top",
    },
    devicePixelRatio: 1,
    aspectRatio: 1,
    // responsive: true,
};

class SimpleRadar extends Component {
    componentDidMount() {}
    render() {
        let graph = base;
        const praticas = this.props.data.temas[this.props.selectedTema]
            .praticas;
        graph.datasets = praticas.map(pratica => {
            const {agua, alimento, energia } = pratica.benchmark;
            return makeDataset(pratica.nome, [agua, alimento, energia]);
        });
        return (
            <div>
                <Radar data={graph} options={options} />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    data: state.praticas.data,
    selectedTema: state.praticas.selectedTema,
});

export default connect(mapStateToProps, null)(SimpleRadar);
