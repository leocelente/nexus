import { useState } from "react";
import "./App.css";

import { Nav, Navbar, Tab, Tabs, ProgressBar } from "react-bootstrap";
import PaginaInicial from "./pages/PaginaInicial";
import Praticas from "./pages/Praticas";
import Indicadores from "./pages/Indicadores";
import Benchmark from "./pages/Benchmark";
import Casos from "./pages/Casos";

function App() {
  const [key, setKey] = useState("home");

  return (
    <div className="App">
      <Navbar bg="dark justify-content-between"   expand="lg">
        <Navbar.Brand href="#home" ><h2 style={{color:'white'}}>PLA.CO.P.A.S</h2></Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#aboutus">Sobre Nós</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="#admin" style={{color:'white'}}>Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <ProgressBar now={75} label={`${75}%`} variant="success" /> */}
      <Tabs id="main-pages-tabs" fg="dark" activeKey={key} onSelect={(k) => setKey(k)}>
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
    </div>
  );
}

export default App;
