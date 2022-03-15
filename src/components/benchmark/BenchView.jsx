import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import SimpleRadar from "../charts/_SimpleRadar";
import html2pdf from "html2pdf.js";

class BenchView extends Component {
    genReport(cenarios, resultados) {
        console.log(`Data: ${Date.now().toLocaleString()}`);
        console.log("Gerando Relatorio para:");
        console.log(cenarios);
        console.log("Com os dados: ");
        console.table(resultados);

        const id = "bench_view";
        const wkr = html2pdf();
        wkr.from(document.getElementById(id))
            .set({
                filename: "relatorio.pdf",
                margin: 5,
            })
            .toPdf()
            .get("pdf")
            .then(function (pdf) {
                window.open(pdf.output("bloburl"), "_blank");
            });
    }

    render() {
        const cenarios = this.props.cenarios;
        const resultados = this.props.resultados;
        return (
            <div>
                <div id="bench_view">
                    <h5>Por Atributos:</h5>
                    <SimpleRadar level="atributo" />
                    <hr />
                    <h5>Por Grupo:</h5>
                    <SimpleRadar level="grupo" />
                    <br />
                </div>
                <hr />
                <div>
                    <Button
                        onClick={() => this.genReport(cenarios, resultados)}
                    >
                        Gerar Relatório{" "}
                    </Button>
                </div>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cenarios: state.praticas.analise.cenarios,
    resultados: state.praticas.analise.resultados,
    graficos: state.indicadores.graficos,
    grupos: state.indicadores.grupos,
    selected: state.praticas.pratica,
    conjunto: state.praticas.conjunto,
    propriedades: state.propriedades.propriedades,
});

export default connect(mapStateToProps, null)(BenchView);
