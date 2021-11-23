import React, { useRef } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

// STYLE
import style from "./style.module.css";

// ASSETS
import pinIcon from "../../../assets/icons/pin-new48.png";

const Map = ReactMapboxGl({
  maxZoom: 20,
  minZoom: 1,
  //  Token mapboxGL
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
});

export default function MapTitik({ long, lati, lokasi }) {
  // console.log("dari map module", long, lati, lokasi);
  const mapRef = useRef();
  return (
    <>
      <div className={style.containerMapPolygon}>
        <Map
          ref={mapRef}
          zoom={[15]}
          // center coordinates indonesia
          center={[long, lati]}
          // maxBounds hanya wilayah di di indonesia
          // maxBounds={[
          //   [86.160622, -17.545353],
          //   [149.441872, 18.118934],
          // ]}
          trackResize={true}
          style={"mapbox://styles/mapbox/satellite-streets-v11"}
          containerStyle={{ height: "100%", width: "100%" }}
          onStyleLoad={async (map, load) => {
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.NavigationControl());

            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            });

            // map.on("load", () => {
            // Add an image to use as a custom marker
            map.loadImage(pinIcon, (error, image) => {
              if (error) throw error;
              map.addImage("custom-marker", image);
              console.log("image");
              // Add a GeoJSON source with 2 points
              map.addSource("points", {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [long, lati],
                      },
                      properties: {
                        title: lokasi,
                      },
                    },
                  ],
                },
              });

              // Add a symbol layer
              map.addLayer({
                id: "points",
                type: "symbol",
                source: "points",
                layout: {
                  "icon-image": "custom-marker",
                  // get the title name from the source's "title" property
                  "text-field": ["get", "title"],
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 1.25],
                  "text-anchor": "top",
                },
                paint: {
                  "text-color": "#ffffff",
                },
              });
            });
            // );

            // let hoveredStateId = null;
            // import json indonesia kabupaten
            // const DATA = import(`./INDONESIA.json`);
            // DATA.then((result) => {
            //   console.log("res dalam mapbox", result);
            //   map.on("load", `points`, function (e) {
            //     map.loadImage(
            //       "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
            //       (error, image) => {
            //         if (error) throw error;
            //         map.addImage("custom-marker", image);
            //         map.addSource("points", {
            //           type: "geojson",
            //           data: {
            //             type: "FeatureCollection",
            //             features: [
            //               {
            //                 // feature for Mapbox DC
            //                 type: "Feature",
            //                 geometry: {
            //                   type: "Point",
            //                   coordinates: [long, lati],
            //                 },
            //                 properties: {
            //                   title: lokasi,
            //                 },
            //               },
            //             ],
            //           },
            //         });

            //         map.addLayer({
            //           id: `points`,
            //           type: "symbol",
            //           maxzoom: 10,
            //           source: `points`,
            //           layout: {
            //             "icon-image": "custom-marker",
            //             "text-field": ["get", "title"],
            //             "text-font": [
            //               "Open Sans Semibold",
            //               "Arial Unicode MS Bold",
            //             ],
            //             "text-offset": [0, 1.25],
            //             "text-anchor": "top",
            //           },
            //         });
            //       }
            //     );
            //   });
            // });
          }}
        />
      </div>
    </>
  );
}
