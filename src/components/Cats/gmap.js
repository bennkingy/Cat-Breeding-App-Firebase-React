import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl"; 
import MapMarker from '../../images/mapmarker.svg'; 

const MapMarkerImage = () => (
  <img src={MapMarker} height={40} width={40} />
);

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 51.5074,
        longitude: 0.1278,
        width: "100%",
        height: "100vh",
        zoom: 2,
        selectedCat: null
      }
    };
  }

  render() {

    console.log(this.state);

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
      >
        {this.props.cats.map(cat => (
          <Marker
            key={cat.uid}
            latitude={cat.lat}
            longitude={cat.lng}
          >
            <button
              onClick={() => {
                this.setState({
                 selctedCat: cat
              })}}
            >
              <MapMarkerImage />
            </button>
          </Marker>
         ))}
        {this.state.selectedCat ? (
          <Popup 
            key={this.state.selectedCat.uid}
            latitude={this.state.selectedCat.lat}
            longitude={this.state.selectedCat.lng}
          >
            <div>
              <h2>{this.state.selectedCat.text}fdsfdsf</h2>
            </div>
          </Popup>
        ) : '' }
      </ReactMapGL>
    );
  }
}

export default (MapContainer);