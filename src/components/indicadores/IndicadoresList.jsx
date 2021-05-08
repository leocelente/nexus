import React, { Component } from "react";
import { connect } from "react-redux";
import { selectIndicador } from "../../redux/actions/indicadoresActions";
import List from "../general/List";

/**
 * Wrapper para mostrar os indicadores em uma lista, sem a opção
 * de saiba mais
 */
class IndicadoresList extends Component {
    
    handle = (i) => {
        this.props.selectIndicador(i);
    };

    showIndicador = (indicador, array) => {
        if(indicador === undefined){
            return "";
        }
        return indicador.nome;
    }

    render() {
        const { grupo, grupos, atributo } = this.props;
        const indicadores = grupos[grupo].atributos[atributo].indicadores;
        return (
            <div>
                <List
                    items={indicadores.map(this.showIndicador, indicadores)}
                    title="Indicadores"
                    onSaibaMais={null}
                    onSelect={(i) => this.handle(indicadores[i])}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    grupo: state.indicadores.grupo,
    grupos: state.indicadores.data.grupos,
    atributo: state.indicadores.atributo,
});
export default connect(mapStateToProps, { selectIndicador })(IndicadoresList);
