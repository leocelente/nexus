import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
/**
 * Wrapper para o layout de duas colunas do boostrap
 */
export class PageBase extends Component {
  render() {
    return (
      <div>
        <Container fluid="true" style={{ backgroundColor: "#f1f1f0" }}>
          <Row className="justify-content-md-center" xs={1} xl={2}>
            <Col>
              <Card>{this.props.left}</Card>
              <br></br>
              {this.props.extra ? <Card>{this.props.extra}</Card>: null}
            </Col>
            <Col>
              <>{this.props.right}</>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PageBase;
