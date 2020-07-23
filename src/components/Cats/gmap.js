import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import MapMarker from "./../../images/mapmarker.svg";

const MapMarkerImage = () => (
  <img src={MapMarker} height={40} width={40} />
);

const MapContainer = (props) => {

  console.log(props.cats);

  let points = [];
  props.cats.forEach(cat => (
    points.push([ cat.lat, cat.lng ])
  ) );

  const [viewport, setViewport] = useState({
    latitude: 51.5074,
    longitude:  0.1278,
    width: "100%",
    height: "600px",
    zoom: 9,
  });

  const [selectedCat, setSelectedCat] = useState(null);
  
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

  const ref = React.createRef();
  const onLoad = () => {
    //const bounds = ref.current.getMap().getBounds().toArray().flat();
    let points = [];
    props.cats.forEach(cat => (
      points.push([ cat.lat, cat.lng ])
    ) );
    console.log('points', points);
    console.log('points', [points]);
    points.length > 0 && ref.current.getMap().fitBounds(points, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      easing(t) {
          return t * (2 - t);
      },
    });
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        ref={ref}
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