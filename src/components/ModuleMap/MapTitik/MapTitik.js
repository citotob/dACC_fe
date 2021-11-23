import React, { useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

// STYLE
import style from "./style.module.css";

// ASSETS
import custom_marker from "../../../assets/images/custom_marker.png";

const Map = ReactMapboxGl({
  maxZoom: 20,
  minZoom: 1,
  //  Token mapboxGL
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
});

export default function MapTitik() {
  const mapRef = useRef();
  return (
    <>
      <div className={style.containerMapTitik}>
        <Map
          ref={mapRef}
          zoom={[3]}
          // center coordinates indonesia
          center={[118.0148634, -2.548926]}
          // maxBounds hanya wilayah di di indonesia
          maxBounds={[
            [86.160622, -17.545353],
            [149.441872, 18.118934],
          ]}
          trackResize={true}
          style={"mapbox://styles/mapbox/streets-v11"}
          containerStyle={{ height: "100%", width: "100%" }}
          onStyleLoad={async (map, load) => {
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.NavigationControl());

            var geojson = {
              type: "FeatureCollection",
              name: "merged",
              crs: {
                type: "name",
                properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
              },
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [121.0, -2.0],
                  },
                },
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [114.0, -2.0],
                  },
                },
              ],
            };

            // ICON MARKER //
            map.loadImage(custom_marker, function (error, image) {
              if (error) throw error;
              map.addImage("Marker", image, { sdf: true });
            });
            map.addSource(`MarkerSource`, {
              type: "geojson",
              data: geojson,
            });
            map.addLayer({
              id: `MarkerLayer`,
              type: "symbol",
              source: `MarkerSource`,
              layout: {
                visibility: "visible",
                "icon-image": "Marker",
                "icon-size": 0.6,
              },
              paint: {
                // Contoh untuk memberikan warna marker sesuai kondisi tertentu
                // "icon-color": [
                //   "match",
                //   ["get", "teknologi"],
                //   "RL",
                //   "red",
                //   "FO",
                //   "blue",
                //   "VSAT",
                //   "green",
                //   "black",
                // ],
                "icon-color": "red",
              },
            });

            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            });

            map.on("mousemove", "MarkerLayer", function (e) {
              var coordinates = e.features[0].geometry.coordinates.slice();
              var description = `
              Longitude: ${e.features[0].geometry.coordinates[0]} \n
              Latitude: ${e.features[0].geometry.coordinates[1]} 
              `;

              // Ensure that if the map is zoomed out such that multiple
              // copies of the feature are visible, the popup appears
              // over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "MarkerLayer", function () {
              map.getCanvas().style.cursor = "pointer";
            });

            // Change it back to a pointer when it leaves.
            map.on("mouseleave", "MarkerLayer", function () {
              map.getCanvas().style.cursor = "";
              popup.remove();
            });
          }}
        />
      </div>
    </>
  );
}
