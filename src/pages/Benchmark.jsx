import React, { Component } from "react";
import { Card,  } from "react-bootstrap";
import List from "../components/List";
import PageBase from "../components/PageBase";
import PraticasList from "../components/PraticasList";
import Select from "../components/Select";
import SelectTema from "../components/SelectTema";
import SimpleRadar from "../components/SimpleRadar";

export default class Benchmark extends Component {
  render() {
    const indicadores = [
      "Indicador 1",
      "Indicador 2",
      "Indicador 3",
      "Indicador 4",
    ];
    
    return (
      <div>
        <PageBase
          left={
            <div>
              <SimpleRadar />
              <Card>
                <span style={{ color: "black" }}>Legenda</span>
              </Card>
            </div>
          }
          right={
            <div>
              <Card>
                <Card.Title>
                  <h4>Benchmarks</h4>
                </Card.Title>
                <Card.Text style={{ color: "black" }}>
                Realize comparações gráficas entre práticas do mesmo tema
                </Card.Text>
              </Card>
              <br></br>
              <SelectTema />
              <br></br>
              <PraticasList />
              <List items={indicadores} title="Indicadores" />
        
            </div>
          }
        />
      </div>
    );
  }
}
