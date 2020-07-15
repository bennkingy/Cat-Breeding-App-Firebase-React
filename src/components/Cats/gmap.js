import React, { useState, useEffect, Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl"; 

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 51.5074,
        longitude: 0.1278,
        width: "100vw",
        height: "100vh",
        zoom: 2
      }
    };
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
        //mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
      >
        { this.props.cats.map(cat => (
          <Marker
            key={cat.uid}
            latitude={cat.lat}
            longitude={cat.lng}
          >
            <div>{cat.text}</div>
          </Marker>
         ))
       }
      </ReactMapGL>
    );
  }
}

export default (MapContainer);