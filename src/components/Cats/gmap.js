import React from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXPKEY

class MapboxGLContainer extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      lat: 52,
      lng: -0.49,
      zoom: 2,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      latitude: [this.state.lat],
      longitude: [this.state.lng],
      zoom: this.state.zoom,
      interactive: true
    });

    map.on('load', () => {

        const cats = prepareGeoJSON(this.props.cats)

        console.log(this.props.cats)

        map.loadImage(
          '/mapmarker.png',            // Add an image to use as a custom marker
            function(error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);

                map.addSource('cats', cats);

                // Add a layer showing the places.
                map.addLayer({
                    'id': 'cats',
                    'type': 'symbol',
                    'source': 'cats',
                    'layout': {
                        'icon-size': 0.1,
                        'icon-image': 'custom-marker',
                        'icon-allow-overlap': true
                    }
                });
            }
        );

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false
        });

        map.on('click', 'cats', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        // map.on('mouseleave', 'cats', function() {
        //     map.getCanvas().style.cursor = '';
        //     popup.remove();
        // });

      if (this.props.cats.length > 0) {
        
        let points = []
  
        this.props.cats.forEach(cat => (
          points.push([cat.lng, cat.lat])
        ));
  
        var bounds = points.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(points[0], points[0]));

          map.fitBounds(bounds, {
            padding: { top: 100, bottom: 100, left: 100, right: 100 },
            easing(t) {
                return t * (2 - t);
            }
          });
      }
    })
  }

  render() {
    return (
      <div>
        <div id="map" className='mapContainer' />
      </div>
    )
  }
}

export default MapboxGLContainer;

// prepare the data as described in the map box docs link
// https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
// https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/

export const prepareGeoJSON = (cats) => {
  
  const map_features = cats.reduce((agg, currentCat) => {

    const feature = {
      'type' : 'Feature',
      'properties': {
        'description':
          `<a href=${'/cat/'+(currentCat.uid).substr(1)}>
            <div class='h-48 w-48 bg-center flex-none bg-cover rounded-t text-center overflow-hidden' style='background:url(${currentCat.imageURL});background-position: center;background-size:cover;'></div>
            <h2><strong>${currentCat.text}</strong></h2>
            <p>${currentCat.description}</p>
          </a>`
      },
      'geometry':{
        'type': 'Point',
        'coordinates': [currentCat.lng, currentCat.lat]
      }
    }

    return [
      ...agg,
      feature
    ]

  },[])
  
  return {
      'type': 'geojson',
      'data': {
      'type': 'FeatureCollection',
      'features': map_features
    }
  }
}