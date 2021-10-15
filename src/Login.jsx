import React, { Component } from "react";
import {
    action_login,
    action_logout,
    is_logged,
} from "./redux/actions/usuarioActions";
import { connect } from "react-redux";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import Header from "./components/general/Header";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.props.is_logged();
        this.state = { user: "", pass: "" };
    }

    setUser(ev) {
        const v = ev.target.value;
        this.setState({
            user: v,
        });
    }

    setPass(ev) {
        const v = ev.target.value;
        this.setState({
            pass: v,
        });
    }

    handleSubmit(f_event) {
        f_event.preventDefault();
        this.props.action_login({
            email: this.state.user,
            senha: this.state.pass,
        });
    }

    render() {
        const { usuario, logado } = this.props.authentication;

        if (logado === null) {
            return <>Checando permissões...</>;
        }
        if (logado === false) {
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
                            <Form
                                noValidate
                                onSubmit={(e) => this.handleSubmit(e)}
                            >
                                <Form.Group
                                    as={Col}
                                    // md="4"
                                    controlId="controlEmail"
                                >
                                    <Form.Label>E-Mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="email"
                                        defaultValue="leocelente@usp.br"
                                        onChange={(e) => this.setUser(e)}
                                    />
                                    <Form.Control.Feedback></Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group
                                    as={Col}
                                    // md="4"
                                    controlId="controlPassword"
                                >
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="senha"
                                        defaultValue=""
                                        onChange={(e) => this.setPass(e)}
                                    />
                                    <Form.Control.Feedback></Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit">Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <div>
                    <Header />
                    <Row fluid="true" className="justify-content-md-center">
                        <Col
                            lg={10}
                            style={{
                                marginTop: "4em",
                                color: "black",
                            }}
                        >
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        <h4>Você está Logado</h4>
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Table>
                                        <tr>
                                            <td>Email: </td>
                                            <td>
                                                {usuario.firebaseUser?.email ||
                                                    "--"}
                                            </td>
                                        </tr>
                                        {/* <tr><td>Nome: </td> <td></td></tr> */}
                                    </Table>
                                </Card.Body>
                                <Card.Footer>
                                    <Row className="justify-content-md-end">
                                        <Button
                                            onClick={() =>
                                                this.props.action_logout()
                                            }
                                        >
                                            Sair
                                        </Button>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, {
    action_login,
    action_logout,
    is_logged,
})(LoginPage);
