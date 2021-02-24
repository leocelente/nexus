import React, { Component } from "react";
import { connect } from "react-redux";
import { selectIndicador } from "../redux/actions/indicadoresActions";
import List from "./List";

class IndicadoresList extends Component {

    componentDidMount(){
        const indicadores = this.props.data.grupos[this.props.grupo].atributos[
            this.props.atributo
        ].indicadores;
        this.props.selectIndicador(indicadores[0]);
    }

    handle = (i) => {
        this.props.selectIndicador(i);
      };

    render() {
        const indicadores = this.props.data.grupos[this.props.grupo].atributos[
            this.props.atributo
        ].indicadores;
        return (
            <div>
                <List
                    items={indicadores.map((x) => x.nome)}
                    title="Indicadores"
                    onSaibaMais={null}
                    onSelect = {(ind)=>this.handle(indicadores[ind])}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    grupo: state.indicadores.grupo,
    data: state.indicadores.data,
    atributo: state.indicadores.atributo,
});
export default connect(mapStateToProps, { selectIndicador })(IndicadoresList);
