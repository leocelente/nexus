import React, { Component, useState } from "react";
import { action_login, action_logout } from "./redux/actions/usuarioActions";
import { connect } from "react-redux";
import {
    Button,
    Col,
    Container,
    FormControl,
    FormText,
    InputGroup,
    Row,
} from "react-bootstrap";

class LoginPage extends Component {
    render() {
        const { authData } = this.props;
        const { usuario, logado } = authData;

        if (logado == false) {
            return (
                <Container>
                    <Row fluid="true" className="justify-content-md-center">
                        <Col
                            lg={10}
                            style={{
                                marginTop: "4em",
                                padding: "1em",
                                border: "1px solid gray",
                                color: "black",
                            }}
                        >
                            <div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            Usuário
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-describedby="basic-addon1" />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            Senha
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="basic-url"
                                        aria-describedby="basic-addon3"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon3">
                                            Propriedade?
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        id="basic-url"
                                        aria-describedby="basic-addon3"
                                    />
                                </InputGroup>
                            </div>
                            <hr></hr>
                            <input defaultValue="leocelente@usp.br" />
                            <Button
                                onClick={() =>
                                    this.props.action_login({
                                        email: "leocelente@usp.br",
                                        senha: "12345678",
                                    })
                                }
                            >
                                Login
                            </Button>{" "}
                            ----{" "}
                            <Button onClick={() => this.props.action_logout()}>
                                Logout
                            </Button>
                            <span style={{ color: "black" }}>
                                :{usuario.nome}:
                            </span>
                        </Col>
                    </Row>
                </Container>
            );
        } else return <div>{this.props.children}</div>;
    }
}

const mapStateToProps = (state) => ({
    authData: state.authentication,
});

export default connect(mapStateToProps, { action_login, action_logout })(
    LoginPage
);
