import React, { Component } from "react";
import List from "./List";
// import { selectTema } from "../redux/actions/praticasActions";
import { praticas } from "../api/mock/praticas";

import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import TableJson from "./TableJson";

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

  render() {
    const handleClose = () => this.setShow(false, "", "");
    const handleShow = (title, content) => this.setShow(true, content, title);
    const tema =praticas.temas[this.props.selectedTema];
    const titulos = tema.praticas.map((p)=>p.titulo);
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

        <List items={titulos} title="Praticas" onSaibaMais={(idx)=>handleShow(titulos[idx], tema.praticas[idx].descricao)}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTema: state.praticas.selectedTema,
});
export default connect(mapStateToProps, null)(PraticasList);
