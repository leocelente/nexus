import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "./Select";
import SelectTema from "./SelectTema";
import indicadores from "../api/mock/indicadores";
import { connect } from "react-redux";
import {
  selectGrupo,
  selectAtributo,
} from "../redux/actions/indicadoresActions";

class GrupoAtributo extends Component {
  handleGrupo = (i) => {
    this.props.selectGrupo(i);
    this.props.selectAtributo(0);
  };

  handleAtributo = (i) => {
    this.props.selectAtributo(i);
  };

  render() {
    const grupos = Object.entries(indicadores).map((x) => x[0]);
    const grupo = grupos[this.props.grupo];
    const atributos = indicadores[grupo].map((a) => a.atributo);
    return (
      <Row>
        <Col>
          <Select
            title="Grupo"
            items={grupos}
            onSelect={this.handleGrupo}
            value={this.props.grupo}
          />
        </Col>
        <Col>
          <Select
            title="Atributos"
            items={atributos}
            onSelect={this.handleAtributo}
            value={this.props.atributo}
          />
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  grupo: state.indicadores.grupo,
  atributo: state.indicadores.atributo,
});
export default connect(mapStateToProps, { selectGrupo, selectAtributo })(
  GrupoAtributo
);
