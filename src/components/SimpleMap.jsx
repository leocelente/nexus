import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      backgroundColor: "white",
      height: "1.3rem",
      width: "5rem",
      color: "black",
      borderRadius: "0.5rem",
      textAlign: "center",
      textDecoration: "underline",
    }}
  >
    {text}
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
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "40rem", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "***REMOVED***" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={-22.53} lng={-43.11} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
