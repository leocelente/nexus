import React, { Component } from "react";
import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";

const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 99, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
];

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
        display: false,
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

export default class PraticaRadar extends Component {
    static propTypes = {
        pratica: PropTypes.any,
    };

    render() {
        console.log(this.props.pratica);
        let data = base;
        // data.datasets = [this.props.pratica];
        const { agua, alimento, energia } = this.props.pratica.benchmark;
        data.datasets = [makeDataset(this.props.pratica.nome, [agua, alimento, energia], 0)];
        return <Radar data={data} options={options} />;
    }
}
