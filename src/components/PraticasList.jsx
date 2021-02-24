import React, { Component } from "react";
import List from "./List";

import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import TableJson from "./TableJson";

import { selectPratica } from "../redux/actions/praticasActions";

class PraticasList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            content: {},
            title: "",
        };
    }
    setShow(show, content, title) {
        this.setState({
            show,
            content,
            title,
        });
    }
    handler = (i) => {
        this.props.selectPratica(i);
    };

    render() {
        const handleClose = () => this.setShow(false, "", "");
        const handleShow = (title, content) =>
            this.setShow(true, content, title);

        const praticas = this.props.data.temas[this.props.selectedTema]
            .praticas;
        return (
            <div>
                <Modal size="lg" show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        <TableJson data={this.state.content} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <List
                    items={praticas.map((x) => x.nome)}
                    title="Praticas"
                    onSelect={(p) => this.handler(praticas[p])}
                    onSaibaMais={(idx) =>
                        handleShow(praticas[idx].nome, praticas[idx].descricao)
                    }
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
