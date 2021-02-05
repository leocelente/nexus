import React, { Component } from "react";
import List from "./List";
import indicadores from "../api/mock/indicadores";

import { connect } from "react-redux";

class IndicadoresList extends Component {
  render() {
    
    const grupos = Object.entries(indicadores).map((x) => x[0]);
    const grupo = grupos[this.props.grupo];
    const atributos = indicadores[grupo][this.props.atributo].indicadores;
    return (
      <div>
        <List
          items={atributos}
          title="Indicadores"
          onSaibaMais={null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  grupo: state.indicadores.grupo,
  atributo: state.indicadores.atributo,
});
export default connect(mapStateToProps, {})(IndicadoresList);
