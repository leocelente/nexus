import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "../general/Select";
import { connect } from "react-redux";
import {
    selectGrupo,
    selectAtributo,
    fetchIndicadores,
} from "../../redux/actions/indicadoresActions";

class GrupoAtributo extends Component {
    
    componentDidMount(){
        this.props.fetchIndicadores();
    }

    handleGrupo = (i) => {
        this.props.selectGrupo(i);
        this.props.selectAtributo(0);
    };

    handleAtributo = (i) => {
        this.props.selectAtributo(i);
    };

    render() {
        return (
            <Row>
                <Col>
                    <Select
                        title="Grupo"
                        items={this.props.data.grupos.map(x=>x.nome)}
                        onSelect={this.handleGrupo}
                        value={this.props.grupo}
                    />
                </Col>
                <Col>
                    <Select
                        title="Atributos"
                        items={this.props.data.grupos[this.props.grupo].atributos.map(x=>x.nome)}
                        onSelect={this.handleAtributo}
                        value={this.props.atributo}
                    />
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = (state) => ({
    data: state.indicadores.data,
    grupo: state.indicadores.grupo,
    atributo: state.indicadores.atributo,
});

export default connect(mapStateToProps, {
    selectGrupo,
    selectAtributo,
    fetchIndicadores,
})(GrupoAtributo);
