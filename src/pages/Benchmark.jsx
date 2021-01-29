import React, { Component } from "react";
import { Card,  } from "react-bootstrap";
import List from "../components/List";
import PageBase from "../components/PageBase";
import Select from "../components/Select";
import SimpleRadar from "../components/SimpleRadar";

export default class Benchmark extends Component {
  render() {
    const indicadores = [
      "Indicador 1",
      "Indicador 2",
      "Indicador 3",
      "Indicador 4",
    ];
    const praticas = ["Pratica 1", "Pratica 2", "Pratica 3", "Pratica 4"];
    const temas = ["Tema_1","Tema_2","Tema_3","Tema_4",];
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
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iusto ab dolores non minima provident eum minus temporibus
                  ratione cumque atque! Animi amet consequatur quis facilis
                  odio, natus accusantium deserunt aliquam.
                </Card.Text>
              </Card>
              <br></br>
              <Select title="Tema" items={temas}/>
              <br></br>

              <List items={indicadores} title="Indicadores" />
              <List items={praticas} title="Praticas" />
            </div>
          }
        />
      </div>
    );
  }
}
