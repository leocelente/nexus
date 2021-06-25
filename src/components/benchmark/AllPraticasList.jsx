import React, { Component } from "react";
import List from "../general/List";

import { connect } from "react-redux";
import { Button, Col, Modal, Row } from "react-bootstrap";
import TableJson from "../general/TableJson";
import PraticaRadar from "../praticas/PraticaRadar";
import { selectPratica } from "../../redux/actions/praticasActions";
import { Pratica } from "../../api/models/pratica";

class AllPraticasList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            pratica: new Pratica({}),
        };
    }
    setShow(show, pratica) {
        this.setState({
            show,
            pratica,
        });
    }
    handler = (i) => {
        console.log(i);
        this.props.selectPratica(i);
    };

    handleClose = () => {
        this.setShow(false, new Pratica({}));
    };

    handleShow = (pratica) => {
        this.setShow(true, pratica);
    };

    render() {
        let nomes = this.props.propriedades
            .map((x) => x.praticas)
            .map((x) => x[0])
            .map((x) => x.nome);
        let praticas = this.props.propriedades
            .map((x) => x.praticas)
            .map((x) => x[0])
            .filter((v, i, s) => nomes.indexOf(v.nome) === i);
        if (praticas[0] === undefined) return <></>;
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
    propriedades: state.propriedades.propriedades,
});
export default connect(mapStateToProps, { selectPratica })(AllPraticasList);