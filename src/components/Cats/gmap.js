import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapMarker from "./../../images/mapmarker.svg";

const MapMarkerImage = () => (
  <img src={MapMarker} height={40} width={40} />
);

const MapContainer = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 51.5074,
    longitude:  0.1278,
    width: "100%",
    height: "80vh",
    zoom: 6
  });

  const [selectedCat, setSelectedCat] = useState(null);

  console.log(props.cats);

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

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >

        {selectedCat ? (
          <Popup
            latitude={selectedCat.lat}
            longitude={selectedCat.lng}
            onClose={() => {
              setSelectedCat(null);
            }}
          >
            <div>
              <h2>{selectedCat.text}</h2>
              <p>{selectedCat.description}</p>
            </div>
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