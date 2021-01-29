import React, { Component } from "react";
import { Button, Modal, Col, Container, Row, Image } from "react-bootstrap";

export default class PaginaInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      content: {},
    };
  }
  setShow(b, c) {
    this.setState({
      show: b,
      content: c,
    });
  }

  render() {
    const handleClose = () => this.setShow(false, "");
    const handleShow = (content) => this.setShow(true, content);
    const tt =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo natus fugiat eveniet laborum ratione. Tenetur quae distinctio quo odit excepturi ipsa, ut minima omnis harum praesentium dolorem aut necessitatibus! Nihil.";
    const img = <Image src="https://via.placeholder.com/465x320" />;
    return (
      <div>
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            {this.state.content}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <h3>
          <u>Pla</u>taforma <u>Co</u>operativa de <u>P</u>raticas <u>A</u>
          gricolas <u>S</u>ustentaveis
        </h3>
        <Container>
          <Row>
            <Col className="pi-card" onClick={() => handleShow(tt)}>
              <span>O Projeto</span>
            </Col>
            <Col className="pi-card" onClick={() => handleShow(tt)}>
              <span>A Plataforma</span>
            </Col>
          </Row>
          <Row>
            <Col className="pi-card" onClick={() => handleShow(img)}>
              <span>A Equipe</span>
            </Col>
            <Col className="pi-card" onClick={() => handleShow(tt)}>
              <span>Propriedades</span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
