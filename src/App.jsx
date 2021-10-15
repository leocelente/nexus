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
import { Link } from "react-router-dom";
import Header from "./components/general/Header";

function App() {
    const [aba, setAba] = useState("home");

    return (
        <div className="App">
            <Header />
            <Tabs
                id="main-pages-tabs"
                fg="dark"
                activeKey={aba}
                onSelect={(k) => setAba(k)}
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
                <Row>
                    <Col lg={6} sm={12}>
                        <Row style={{ height: "4rem" }}>
                            <span className="copyright">
                                PLACOPAS, uma parceria{" "}
                                <a href="http://nups.shs.eesc.usp.br/">NUPS</a>{" "}
                                e <a href="https://www.embrapa.br">EMBRAPA</a>{" "}
                                &copy; 2021
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
