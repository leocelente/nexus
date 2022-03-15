import React, { Component } from "react";
import List from "../general/List";

import { connect } from "react-redux";
import { Button, Col, Modal, Row } from "react-bootstrap";
import TableJson from "../general/TableJson";

import { selectPratica } from "../../redux/actions/praticasActions";
import PraticaRadar from "./PraticaRadar";
import { Pratica } from "../../api/models/pratica";
import SingleList from "../general/SingleList";

class PraticasList extends Component {
    constructor(props) {
        super(props);
    }

    handler = (i) => {
        this.props.selectPratica(i);
    };

    render() {
        const praticas = this.props.temas[this.props.selectedTema].praticas;
        return (
            <SingleList
                items={praticas.map((x) => x.nome)}
                title="Praticas"
                onSaibaMais={null}
                onSelect={(p) => this.handler(praticas[p])}
                // onSaibaMais={(idx) => this.handleShow(praticas[idx])}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    selectedTema: state.praticas.selectedTema,
    temas: state.praticas.temas,
});
export default connect(mapStateToProps, { selectPratica })(PraticasList);
