import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapMarker from "./../../images/mapmarker.svg";

import mapboxgl from 'mapbox-gl'

const MapMarkerImage = () => (
  <img src={MapMarker} height={40} width={40} alt="cat"/>
);

const MapContainer = (props) => {

  const mapRef = useRef()

  const [selectedCat, setSelectedCat] = useState(null);
  const [viewport, setViewport] = useState({
    center: [52, -0.49],
    latitude: 52,
    longitude: -0.49,
    width: "100%",
    height: "600px",
    zoom: 9,
  });

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedCat(null);
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
    
  }, []);

  const onLoad = () => {

    if (props.cats.length > 0) {

      // const lat = props.cats.map(location => parseFloat(location.lat))
      // const lng = props.cats.map(location => parseFloat(location.lng))

      // const minCoords = [Math.min.apply(null, lng), Math.min.apply(null, lat)]
      // const maxCoords = [Math.max.apply(null, lng), Math.max.apply(null, lat)]

      // const bounds = [minCoords, maxCoords]


      let points = []

      props.cats.forEach(cat => (
        points.push([ cat.lng, cat.lat ])
      ) );

      var bounds = points.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(points[0], points[0]));

      mapRef.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        easing(t) {
            return t * (2 - t);
        }
      }); 

    }
  };


  console.log(viewport)

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        ref={ref => mapRef.current = ref && ref.getMap()}
        onLoad={onLoad}
      >

        {selectedCat ? (
          <Popup
            latitude={selectedCat.lat}
            longitude={selectedCat.lng}
            onClose={() => {
              setSelectedCat(null);
            }}
          >
            <a href={'/cat/'+(selectedCat.uid).substr(1)}>
              <div className="h-48 w-48 bg-center flex-none bg-cover rounded-t text-center overflow-hidden" style={{ backgroundImage: `url(${selectedCat.imageURL})` }}></div>
              <h2>{selectedCat.text}</h2>
              <p>{selectedCat.description}</p>
            </a>
          </Popup>
        ) : null}

        {props.cats.map(cat => (
          <Marker
            key={cat.uid}
            latitude={cat.lat}
            longitude={cat.lng}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedCat(cat);
              }}
            >
              <MapMarkerImage />
            </button>
          </Marker>
        ))}

      </ReactMapGL>
    </div>
  );
}

export default (MapContainer);