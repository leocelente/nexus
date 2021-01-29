import React, { Component } from "react";
import List from "../components/List";

import Mapa from "../images/mapa-região.jpeg";

import PageBase from "../components/PageBase";
import SimpleRadar from "../components/SimpleRadar";
import { Card, Form, Image } from "react-bootstrap";
import Select from "../components/Select";

export default class Praticas extends Component {
  render() {
    var praticas = ["Pratica 1", "Pratica 2", "Pratica 1", "Pratica 3"];
    const temas = ["Tema_1","Tema_2","Tema_3","Tema_4"];

    return (
      <div>
        <PageBase
          left={<Image src={Mapa} />}
          right={
            <div>
              <Card>
                <Card.Title>
                  <h4>Segundo Passo</h4>
                </Card.Title>
                <Card.Text style={{ color: "black" }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Praesentium ab fugiat odit maxime laboriosam. Quod repudiandae
                  dicta vero vel dolorum ad, sint dolores, odio nisi nemo
                  doloremque, reiciendis quas iusto!
                </Card.Text>
              </Card>
              <br></br>

              <Select title="Tema" items={temas}/>
              
              <br></br>

              <List items={praticas} title="Praticas" title="Praticas" />
            </div>
          }
        />
      </div>
    );
  }
}
