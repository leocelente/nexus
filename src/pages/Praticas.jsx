import React, { Component } from "react";
import PageBase from "../components/general/PageBase";
import { Card} from "react-bootstrap";
import SelectTema from "../components/praticas/SelectTema";
import PraticasList from "../components/praticas/PraticasList";
import SimpleMap from "../components/charts/SimpleMap";

/**
 * Pagina de Praticas, duas colunas, uma com o mapa mostrando quais
 * propriedades usam uma pratica e na outra o dropdown para selecionar um tema 
 * e depois a pratica dentro do tema
 * 
 */
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
