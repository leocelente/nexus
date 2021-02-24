import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import "../css/marker.css";
const AnyReactComponent = ({ text }) => (
    <div
        style={{
            backgroundColor: "white",
            height: "1.3rem",
            width: "auto",
            color: "black",
            borderRadius: "0.5rem",
            textAlign: "center",
            textDecoration: "underline",
        }}
    >
        {text}
    </div>
);
const Marker = (props) => {
    return (
        <>
            <div className="pin"></div>
            <div className="pulse"></div>
        </>
    );
};

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: -22.54,
            lng: -43.12,
        },
        zoom: 8,
    };

    render() {
        // console.log(this.props.pratica);
        const pos = this.props.pratica.propriedades.map((propriedade) => {
            return (
                <Marker
                    lat={propriedade.gps.latitude}
                    lng={propriedade.gps.longitude}
                />
            );
        });
        return (
            <div style={{ height: "40rem", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_API }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {pos}
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // data: state.praticas.data,
    pratica: state.praticas.pratica,
});

export default connect(mapStateToProps, null)(SimpleMap);
