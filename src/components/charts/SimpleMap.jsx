/***
 * Dada a pratica selecionada renderiza o Google Maps
 * mostrando a localização das propriedades usando essa
 * pratica
 */

import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import "../../css/marker.css";
import { Table } from "react-bootstrap";

/**
 *
 * @param {} paremetros
 * O count é o numero do pino e o nome é o texto que aparece no hover
 * @returns componente com estilo de marcador
 */
const Marker = ({ count, nome }) => (
    <div className="pin">
        {count}
        <span className="tooltiptext">{nome}</span>
    </div>
);

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: -22.54,
            lng: -43.12,
        },
        zoom: 8,
    };

    render() {
        const propriedades = [this.props.selected];
        // constroi um marcador para cada propriedade
        // note que essa propriedades estão dentro da pratica
        // é o subconjunto de propriedades que fazem uso da pratica
        const pos = propriedades.map((p, i) => (
            <Marker
                key={i}
                lat={p.gps.latitude}
                lng={p.gps.longitude}
                nome={p.nome}
                count={i + 1}
            />
        ));
        return (
            <div
                style={{
                    backgroundColor: "white",
                    border: "1px solid lightgray",
                }}
            >
                <div style={{ height: "40vh", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_API }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {pos}
                    </GoogleMapReact>
                </div>
                <hr />
                {/* <h3>Legenda:</h3> */}
                {/* Tabela contendo uma legenda ligando index de pontos e as
                propriedades que eles representam */}
                <div style={{ color: "black" }}>
                    <Table size="sm" bordered hover>
                        <thead>
                            <tr>
                                <th>Marcador</th>
                                <th>Nome da Propriedade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propriedades.map((p, i) => {
                                if (p.gps.latitude !== 0.0)
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {propriedades.indexOf(p) + 1}
                                            </td>
                                            <td>{p.nome}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selected: state.propriedades.propriedade,
});

export default connect(mapStateToProps, null)(SimpleMap);
