import React, { Component, Fragment } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '900px',
  height: '900px',
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);
  }

  displayMarkers = () => {
    return this.props.cats.map((cat, index) => {
      return <Marker key={index} id={index} position={{
       lat: cat.lat,
       lng: cat.lng
     }}
     onClick={() => alert(cat.image)} />
    })
  }

  componentDidMount() {
  }

  render() {
    console.log('gmap', this.props)
    return (
      <Fragment>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{lat: 51.509865, lng: -0.118092}}
        >
          {this.displayMarkers()}
        </Map>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEGMAPKEY
})(MapContainer);
