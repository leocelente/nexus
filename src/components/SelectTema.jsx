import React, { Component } from "react";
import Select from "./Select";
import { selectTema } from "../redux/actions/praticasActions";
import { praticas } from "../api/mock/praticas";

import { connect } from "react-redux";

class SelectTema extends Component {
  handle = (i) => {
    this.props.selectTema(i);
  };
  render() {
    const temas = praticas.temas.map((tema) => tema.nome);
    return (
      <div>
        <Select title="Tema" items={temas} onSelect={this.handle} value={this.props.selectedTema}/>
      </div>
    );
  }
}
const mapStateToProps = state => ({selectedTema: state.praticas.selectedTema});
export default connect(mapStateToProps, { selectTema })(SelectTema);
