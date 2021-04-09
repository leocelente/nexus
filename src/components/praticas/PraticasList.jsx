import React, { Component } from "react";
import List from "../general/List";

import { connect } from "react-redux";
import { Button, Col, Modal, Row } from "react-bootstrap";
import TableJson from "../general/TableJson";

import { selectPratica } from "../../redux/actions/praticasActions";
import PraticaRadar from "./PraticaRadar";

class PraticasList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            pratica: { nome: "", descricao: {}, benchmark: {} },
        };
    }
    setShow(show, pratica) {
        this.setState({
            show,
            pratica,
        });
    }
    handler = (i) => {
        this.props.selectPratica(i);
    };

    handleClose = () => {
        this.setShow(false, { nome: "", descricao: {}, benchmark: {} });
    };

    handleShow = (pratica) => {
        this.setShow(true, pratica);
    };

    render() {
        const praticas = this.props.data.temas[this.props.selectedTema]
            .praticas;
        return (
            <div>
                <Modal
                    size="xl"
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.pratica.nome}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        <Row>
                            <Col>
                                <TableJson
                                    data={this.state.pratica.descricao}
                                />
                            </Col>
                            <Col>
                                <PraticaRadar pratica={this.state.pratica} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <List
                    items={praticas.map((x) => x.nome)}
                    title="Praticas"
                    onSelect={(p) => this.handler(praticas[p])}
                    onSaibaMais={(idx) => this.handleShow(praticas[idx])}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedTema: state.praticas.selectedTema,
    data: state.praticas.data,
});
export default connect(mapStateToProps, { selectPratica })(PraticasList);
