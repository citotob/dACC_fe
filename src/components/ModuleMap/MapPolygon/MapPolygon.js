import React, { useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

// STYLE
import style from "./style.module.css";

// ASSETS
// import custom_marker from "../../../assets/images/custom_marker.png";

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
      <div className={style.containerMapPolygon}>
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

            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            });

            let hoveredStateId = null;
            // import json indonesia kabupaten
            const DATA = import(`./INDONESIA.json`);
            DATA.then((result) => {
              map.addSource(`PolygonSource`, {
                type: "geojson",
                data: result,
              });

              map.addLayer({
                id: `PolygonLayer`,
                type: "fill",
                maxzoom: 10,
                source: `PolygonSource`,
                layout: {
                  visibility: "visible",
                },
                paint: {
                  "fill-color": "#ffb95a",
                  "fill-opacity": [
                    "case",
                    ["==", ["feature-state", "hover"], "hover"],
                    0.3,
                    ["==", ["feature-state", "hover"], "default"],
                    0.6,
                    0.6,
                  ],
                },
              });
              map.on("mousemove", `PolygonLayer`, function (e) {
                let popInfo = `
              <h5>${e.features[0].properties.provinsi}<h5>
              `;

                map.getCanvas().style.cursor = "pointer";
                if (e.features.length > 0) {
                  if (hoveredStateId) {
                    map.setFeatureState(
                      { source: `PolygonSource`, id: hoveredStateId },
                      { hover: "default" }
                    );
                    popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(map);
                  }

                  hoveredStateId = e.features[0].properties.id;

                  map.setFeatureState(
                    { source: `PolygonSource`, id: hoveredStateId },
                    { hover: "hover" }
                  );
                }
              });
              map.on("mouseleave", `PolygonLayer`, function () {
                map.getCanvas().style.cursor = "";
                popup.remove();
              });
            });
          }}
        />
      </div>
    </>
  );
}
