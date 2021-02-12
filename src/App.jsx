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
      <Navbar bg="dark justify-content-between" expand="lg">
        <Navbar.Brand href="#home">
          <h2 style={{ color: "white" }}>PLA.CO.P.A.S</h2>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#aboutus">Sobre Nós</Nav.Link> */}
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
      <footer>
        <Row className="">
          <Col lg={5} sm={6}>
            <Row style={{ height: "6rem" }}>
              <span className="copyright">Plataforma Nexus by NUPS.</span>
              <span className="copyright">
                {" "}
                Todos os direitos reservados &copy; 2021
              </span>
            </Row>
          </Col>
          <Col lg={7} sm={6}>
            <Row className="">
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
