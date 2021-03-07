import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import "../css/marker.css";
import { Row } from "react-bootstrap";

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
        const pos = this.props.pratica.propriedades.map((p) => (
            <Marker
                lat={p.gps.latitude}
                lng={p.gps.longitude}
                nome={p.nome}
                count={this.props.pratica.propriedades.indexOf(p) + 1}
            />
        ));
        return (
            <>
                <div style={{ height: "70vh", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_API }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {pos}
                    </GoogleMapReact>
                </div>
                <hr />
                <h3>Legenda:</h3>
                <div style={{ color: "black", paddingLeft: "2rem" }}>
                    {this.props.pratica.propriedades.map((p) => (
                        <Row>
                            {p.gps.latitude !== 0.0
                                ? this.props.pratica.propriedades.indexOf(p) + 1 + ":"
                                : ""}
                             {p.nome}
                        </Row>
                    ))}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    pratica: state.praticas.pratica,
});

export default connect(mapStateToProps, null)(SimpleMap);
