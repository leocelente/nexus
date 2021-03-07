import React, { Component } from "react";
import { Card } from "react-bootstrap";
import GrupoAtributo from "../components/GrupoAtributo";
import IndicadoresList from "../components/IndicadoresList";
import List from "../components/List";
import PageBase from "../components/PageBase";
import Select from "../components/Select";
import SelectTema from "../components/SelectTema";
import SimpleBar from "../components/SimpleBar";
import VariantBar from "../components/VariantBar";

export default class Indicadores extends Component {
  render() {
    const indicadores = [
      "Indicador 1",
      "Indicador 2",
      "Indicador 1",
      "Indicador 3",
    ];

    return (
      <div>
        <PageBase
          left={<SimpleBar />}
          extra ={<VariantBar />}
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
              <GrupoAtributo />
              
              <br></br>
            
              {/* <List items={indicadores} title="Indicadores" /> */}
              <IndicadoresList />
            </div>
          }
        />
      </div>
    );
  }
}
