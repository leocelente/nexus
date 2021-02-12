import React, { Component } from "react";
import List from "../components/List";

import Mapa from "../images/mapa-região.jpeg";

import PageBase from "../components/PageBase";
import { Card, Image } from "react-bootstrap";
import Select from "../components/Select";

import { selectTema } from "../redux/actions/praticasActions";
import SelectTema from "../components/SelectTema";
import PraticasList from "../components/PraticasList";
import SimpleMap from "../components/SimpleMap";

export default class Praticas extends Component {
  render() {
    return (
      <div>
        <PageBase
          left={<SimpleMap />}
          right={
            <div>
              <Card>
                <Card.Title>
                  <h4>Segundo Passo</h4>
                </Card.Title>
                <Card.Text style={{ color: "black" }}>
                  Conheça diferentes práticas rurais ligadas à manutenção da
                  segurança - tanto hídrica e energética quanto alimentar
                </Card.Text>
              </Card>
              <br></br>

              {/* <Select title="Tema" items={temas}/> */}
              <SelectTema />
              <br></br>

              <PraticasList />
            </div>
          }
        />
      </div>
    );
  }
}
