import React, { Component } from "react";
import { connect } from "react-redux";
import SubRadar from "./SubRadar";

class RadarContainer extends Component {
    render() {
        let atributos = [];
        this.props.grupos.forEach((grupo) => {
            atributos = [...atributos, ...grupo.atributos];
        });

        let praticas = this.props.praticas.temas[this.props.tema].praticas;
        praticas.forEach((p) => (p.data = []));

        let benchs = {};
        praticas.forEach((pratica) => {
            benchs[pratica.nome] = {};
            pratica.b_atributos.forEach(({ atributo, valor }) => {
                benchs[pratica.nome][atributo.nome] = { valor };
            });
        });
        praticas.forEach((pratica) => {
            Object.entries(benchs[pratica.nome]).forEach((b) => {
                pratica.data.push(b[1]);
            });
        });
        return (
            <>
                {praticas.map((pratica) => {
                    return (
                        <>
                            <SubRadar
                                data={pratica.data}
                                atributos={atributos}
                            />
                            <hr />
                        </>
                    );
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    praticas: state.praticas.data,
    tema: state.praticas.selectedTema,

    grupos: state.indicadores.data.grupos,
    atributo: state.indicadores.atributo,
});
export default connect(mapStateToProps, null)(RadarContainer);
