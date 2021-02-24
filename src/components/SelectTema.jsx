import React, { Component } from "react";
import Select from "./Select";
import { selectTema, fetchPraticas } from "../redux/actions/praticasActions";
import { praticas } from "../api/mock/praticas";

import { connect } from "react-redux";

class SelectTema extends Component {
componentDidMount(){
    this.props.fetchPraticas();
}
  handle = (i) => {
    this.props.selectTema(i);
  };
  render() {
    const temas = this.props.data.temas;
    return (
      <div>
        <Select title="Tema" items={temas.map(x=>x.nome)} onSelect={this.handle} value={this.props.selectedTema}/>
      </div>
    );
  }
}
const mapStateToProps = state => ({selectedTema: state.praticas.selectedTema, data: state.praticas.data});
export default connect(mapStateToProps, { selectTema, fetchPraticas })(SelectTema);
