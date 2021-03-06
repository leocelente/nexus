import React, { Component } from "react";
import { Button, Modal, Col, Container, Row, Image } from "react-bootstrap";
import equipe from "../images/equipe_cropped.jpg";
import PropriedadesTables from "../components/pagina-inicial/PropriedadesTables";
import textos from "../api/mock/inicial";

/**
 * Página inicial, mostra as informações do projeto e da equipe.
 * Atualmente mostra as informações das propriedades mas devido a questões de
 * privacidade devem ser colocadas depois de um login
 */
export default class PaginaInicial extends Component {
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

    render() {
        const handleClose = () => this.setShow(false, "", "");
        const handleShow = (title, content) =>
            this.setShow(true, content, title);
        const img = <Image src={equipe} />;
        const pp = <PropriedadesTables />;
        return (
            <div>
                <Modal size="lg" show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        {this.state.content}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Container>
                    <Row fluid="true" className="justify-content-md-center">
                        <Col
                            lg={5}
                            className="pi-card"
                            onClick={() =>
                                handleShow("O Projeto", textos["O Projeto"])
                            }
                        >
                            <span>O Projeto</span>
                        </Col>
                        <Col
                            lg={5}
                            className="pi-card"
                            onClick={() =>
                                handleShow(
                                    "A Plataforma",
                                    textos["A Plataforma"]
                                )
                            }
                        >
                            <span>A Plataforma</span>
                        </Col>
                    </Row>
                    <Row fluid="true" className="justify-content-md-center">
                        <Col
                            lg={5}
                            className="pi-card"
                            onClick={() => handleShow("A Equipe", img)}
                        >
                            <span>A Equipe</span>
                        </Col>
                        <Col
                            lg={5}
                            className="pi-card"
                            onClick={() => handleShow("Propriedades", pp)}
                        >
                            <span>Propriedades</span>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
