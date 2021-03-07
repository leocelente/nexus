import React, { Component } from "react";
import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";

const colors = [
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 99, 255, 0.5)",
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(255, 159, 64, 0.5)",
];

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
export default class SubRadar extends Component {
    static propTypes = {
        atributos: PropTypes.array,
        data: PropTypes.array,
    };

    render() {
        let labels = this.props.atributos.map((x) => x.nome);
        let datasets = this.props.data.map((x) => x.valor);
        let data = {
            labels,
            datasets: [
                makeDataset("Atributos", datasets, 0),
            ]
        };
        return (
            <div>
                <Radar options={options} data={data} />
            </div>
        );
    }
}
