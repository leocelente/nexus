import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropriedadeAtual from "../propriedades/PropriedadeAtual";

export default class Header extends Component {
    render() {
        return (
            <Navbar bg="dark">
                <Navbar.Brand className="d-lg-none">
                    <>
                        <Link to="/" style={{ color: "white" }}>
                            <h2> PLA.CO.P.A.S</h2>
                        </Link>
                    </>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto ">
                        {" "}
                        {/* mx-auto */}
                        <Link to="/">
                            <h2
                                className="d-none d-sm-block"
                                style={{
                                    color: "white",
                                }}
                            >
                                Plataforma Cooperativa de Práticas Agrícolas
                                Sustentaveis
                            </h2>
                        </Link>
                    </Nav>
                    <Nav>
                        <PropriedadeAtual />
                        <Nav.Link>
                            <Link style={{ color: "white" }} to="/admin">
                                Admin
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
