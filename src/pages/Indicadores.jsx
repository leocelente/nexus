import React, { Component } from "react";
import { Card } from "react-bootstrap";
import List from "../components/List";
import PageBase from "../components/PageBase";
import Select from "../components/Select";
import SelectTema from "../components/SelectTema";
import SimpleBar from "../components/SimpleBar";

export default class Indicadores extends Component {
  render() {
    const indicadores = [
      "Indicador 1",
      "Indicador 2",
      "Indicador 1",
      "Indicador 3",
    ];
    const temas = ["Tema_1","Tema_2","Tema_3","Tema_4"];

    return (
      <div>
        <PageBase
          left={<SimpleBar />}
          right={
            <div>
              <Card>
                <Card.Title>
                  <h4>Primeiro Passo</h4>
                </Card.Title>
                <Card.Text style={{ color: "black" }}>
                Acesse indicadores NEXUS para fazer comparações entre diferentes propriedades
                </Card.Text>
              </Card>
              <br></br>
              <SelectTema />
              
              <br></br>
            
              {/* <List items={indicadores} title="Tema" /> */}
              <List items={indicadores} title="Indicadores" />
            </div>
          }
        />
      </div>
    );
  }
}
