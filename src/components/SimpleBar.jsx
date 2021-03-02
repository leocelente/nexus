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
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
    responsive: true,
};

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
    labels: [2024, 2025, 2026],
    datasets: [
        {
            label: "Propriedade X",
            data: [-10, 20, -40],
        },
    ],
};

class SimpleBar extends Component {
    componentDidMount() {
        this.props.fetchPropriedades();
        this.props.fetchSerieHist();
    }

    render() {
        console.log(this.props.selectedIndicador);
        if (this.props.selectedIndicador?.indicador?.nome === "") {
            return (
                <>
                    <h2>Selecione um Indicador</h2>
                    <span style={{color: 'black'}}>
                        Clique em um dos indicadores na lista para ver o
                        historico do indicador nas propriedades
                    </span>
                </>
            );
        }
        let data = base;
        let graficos = {};
        //TODO: Use forEach
        for (let i = 0; i < this.props.serie.dados.length; i++) {
            let currentIndicador = this.props.serie.dados[i].indicador.nome;
            graficos[currentIndicador] = { series: [] };
            //TODO: Use forEach
            for (let p = 0; p < this.props.serie.dados[i].data.length; p++) {
                let dado = this.props.serie.dados[i].data[p];
                graficos[currentIndicador].series.push({
                    valor: dado.valor,
                    tempo: dado.tempo,
                    propriedade: dado.propriedade.nome,
                });
            }
        }

        for (let indicador in graficos) {
            // TODO: Use Array.find()
            if (indicador == this.props.selectedIndicador.indicador.nome) {
                let indicador_data = graficos[indicador];
                let datasets = [];
                let labels = [];
                indicador_data.series.forEach((ponto) => {
                    let dset = datasets.findIndex(
                        (e) => e.label == ponto.propriedade
                    );
                    if (dset === -1) {
                        datasets.push({ label: ponto.propriedade, data: [] });
                        dset = datasets.length - 1;
                    }
                    if (!labels.includes(ponto.tempo)) {
                        labels.push(ponto.tempo);
                    }
                    datasets[dset].data.push(ponto.valor);
                });

                data.datasets = datasets.map((x) =>
                    makeDataset(x.label, x.data)
                );
                data.labels = labels;
                break;
            }
        }

        return <Bar className="left-column" data={data} options={options} />;
    }
}

const mapStateToProps = (state) => ({
    serie: state.indicadores.serie,
    selectedIndicador: state.indicadores.selectedIndicador,
});

export default connect(mapStateToProps, { fetchPropriedades, fetchSerieHist })(
    SimpleBar
);
