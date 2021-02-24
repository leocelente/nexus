import { useState } from "react";
import "./App.css";

import { Col, Image, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap";
import PaginaInicial from "./pages/PaginaInicial";
import Praticas from "./pages/Praticas";
import Indicadores from "./pages/Indicadores";
import Benchmark from "./pages/Benchmark";
import Casos from "./pages/Casos";

import img_usp from "./images/usp-preto.png";

import img_embrapa from "./images/embrapa.png";
import img_eesc from "./images/eesc-horizontal.png";
import img_cnpq from "./images/cnpq.png";

function App() {
    const [key, setKey] = useState("home");

    return (
        <div className="App">
            <Navbar bg="dark" >
                <Navbar.Brand className="d-lg-none">
                    <>
                        <h2 style={{ color: "white" }}>PLA.CO.P.A.S</h2>
                    </>
                </Navbar.Brand>
                {/* <Navbar.Brand>
                </Navbar.Brand> */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto "> {/* mx-auto */}
                        {/* <Nav.Link href="#aboutus">Sobre Nós</Nav.Link> */}
                        {/* <Navbar.Text>Plataforma de </Navbar.Text> */}
                        <h2 className="d-none d-sm-block" style={{ color: "white", /** marginLeft:'3.3rem' */ }}>
                            Plataforma Cooperativa de Práticas Agrícolas Sustentaveis
                        </h2>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#admin" style={{ color: "white" }}>
                            Admin
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <ProgressBar now={75} label={`${75}%`} variant="success" /> */}
            <Tabs
                id="main-pages-tabs"
                fg="dark"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Pagina Inicial">
                    <PaginaInicial />
                </Tab>
                <Tab eventKey="indicadores" title="1. Indicadores">
                    <Indicadores />
                </Tab>
                <Tab eventKey="praticas" title="2. Praticas">
                    <Praticas />
                </Tab>
                <Tab eventKey="benchmark" title="3. Benchmark">
                    <Benchmark />
                </Tab>
                <Tab eventKey="casos" title="Casos de Uso">
                    <Casos />
                </Tab>
            </Tabs>
            <footer className="d-none d-sm-block">
                <Row >
                    <Col lg={6} sm={12}>
                        <Row style={{ height: "4rem" }}>
                            <span className="copyright">
                                Plataforma Nexus by NUPS. Todos os direitos
                                reservados &copy; 2021
                            </span>
                        </Row>
                    </Col>
                    <Col lg={6} sm={12}>
                        <Row className="justify-content-end">
                            <Image src={img_embrapa} />
                            <Image src={img_eesc} />
                            <Image src={img_cnpq} />
                            <Image src={img_usp} />
                        </Row>
                    </Col>
                </Row>
            </footer>
        </div>
    );
}

export default App;
