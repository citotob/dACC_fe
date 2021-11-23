import React, { useRef, useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

// Import KML converter
import { kml } from "@tmcw/togeojson";

// STYLE
import style from "./style.module.css";

// ASSETS
// import pinIcon from "../../../assets/icons/pin-new48.png";
import pinDefault from "../../../assets/icons/pinDefault.png";
import pinCircle from "../../../assets/icons/pinCircle.png";
import pinHome from "../../../assets/icons/pinHome.png";
import pinArrow from "../../../assets/icons/pinArrow.png";

const Map = ReactMapboxGl({
  maxZoom: 20,
  minZoom: 1,
  //  Token mapboxGL
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
});

export default function MapTitik({ long, lati, lokasi }) {
  const mapRef = useRef();

  // KML Map state
  const [dataGeoJSON, setdataGeoJSON] = useState([]);
  const [latCenter, setlatCenter] = useState("");
  const [longCenter, setlongCenter] = useState("");
  let iconImages = [];

  useEffect(() => {
    // ================ Import KML dan Covert to GeoJson
    fetch("https://cesium.naufalibnusalam.com/kml/MAPS_WAIGAMA_BARAT.kmz")
      .then(function (response) {
        return response.text();
      })
      .then(function (xml) {
        let GeoJSON = kml(new DOMParser().parseFromString(xml, "text/xml"));
        // console.log("GEOJSON", GeoJSON);
        setdataGeoJSON(GeoJSON);
      });

    // ================ Import KML dari local files
    const DATA = import(`./KML_Google_Sample.json`);
    DATA.then((result) => {
      let features = result.default.features;
      setlatCenter(features[0].geometry.coordinates[0]);
      setlongCenter(features[0].geometry.coordinates[1]);
    });
  }, []);

  console.log("data geojson iniiii", dataGeoJSON);

  return (
    <>
      <div className={style.containerMapPolygon}>
        <Map
          ref={mapRef}
          zoom={[15]}
          center={[latCenter, longCenter]}
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

            const DATA = import(`./KML_Google_Sample.json`);

            DATA.then((result) => {
              let features = result.default.features;
              console.log("Features : ", features);
              let arrayPoint = [];
              let arrayLineString = [];
              let arrayPolygon = [];

              features.map((e) => {
                if (e.geometry !== null) {
                  console.log("ada typenya : ", e.geometry.type);
                  if (e.geometry.type === "Point") {
                    arrayPoint.push(e);
                    if (e.properties.icon !== undefined) {
                      iconImages.push(e.properties.icon);
                    }
                  } else if (e.geometry.type === "LineString") {
                    arrayLineString.push(e);
                  } else if (e.geometry.type === "Polygon") {
                    arrayPolygon.push(e);
                  }
                } else {
                  console.log("tidak ada type");
                }
              });

              console.log("point array", arrayPoint);
              console.log("line string array", arrayLineString);
              console.log("polygon array", arrayPolygon);
              console.log("icon array ", iconImages);

              // ============================== Layer Pin Start ====================
              arrayPoint.map((item, i) => {
                switch (item.properties.name) {
                  case "Simple placemark":
                    console.log("simple placemark");
                    map.loadImage(pinDefault, (error, image) => {
                      if (error) throw error;
                      map.addImage("pinDefault", image);
                      map.addSource("pointDefault", {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [item],
                        },
                      });

                      map.addLayer({
                        id: "pointDefault",
                        type: "symbol",
                        source: "pointDefault",
                        layout: {
                          "icon-image": "pinDefault",
                          "text-field": ["get", "title"],
                          "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                          ],
                          "text-offset": [0, 1.25],
                          "text-anchor": "top",
                        },
                        paint: {
                          "text-color": "#ffffff",
                        },
                      });
                    });

                    break;

                  case "Floating placemark":
                    console.log("Floating placemark");
                    map.loadImage(pinHome, (error, image) => {
                      if (error) throw error;
                      map.addImage("pinHome", image);

                      map.addSource("pointHome", {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [item],
                        },
                      });

                      map.addLayer({
                        id: "pointHome",
                        type: "symbol",
                        source: "pointHome",
                        layout: {
                          "icon-image": "pinHome",
                          "text-field": ["get", "title"],
                          "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                          ],
                          "text-offset": [0, 1.25],
                          "text-anchor": "top",
                        },
                        paint: {
                          "text-color": "#ffffff",
                        },
                      });
                    });

                    break;

                  case "Extruded placemark":
                    console.log("Extruded placemark");
                    map.loadImage(pinCircle, (error, image) => {
                      if (error) throw error;
                      map.addImage("pinCircle", image);
                      map.addSource("pointCircle", {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [item],
                        },
                      });

                      map.addLayer({
                        id: "pointCircle",
                        type: "symbol",
                        source: "pointCircle",
                        layout: {
                          "icon-image": "pinCircle",
                          "text-field": ["get", "title"],
                          "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                          ],
                          "text-offset": [0, 1.25],
                          "text-anchor": "top",
                        },
                        paint: {
                          "text-color": "#ffffff",
                        },
                      });
                    });

                    break;

                  case "Roll over this icon":
                    console.log("Roll placemark");
                    map.loadImage(pinArrow, (error, image) => {
                      if (error) throw error;
                      map.addImage("pinArrow", image);
                      map.addSource("pointArrow", {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [item],
                        },
                      });

                      map.addLayer({
                        id: "pointArrow",
                        type: "symbol",
                        source: "pointArrow",
                        layout: {
                          "icon-image": "pinArrow",
                          "text-field": ["get", "title"],
                          "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                          ],
                          "text-offset": [0, 1.25],
                          "text-anchor": "top",
                        },
                        paint: {
                          "text-color": "#ffffff",
                        },
                      });
                    });

                    break;

                  default:
                    break;
                }
              });
              // ============================== Layer Pin End ====================

              // ============================== Layer Polygon Start ====================
              arrayPolygon.map((item, i) => {
                map.addSource(`PolygonSource${i}`, {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    // geometry: arrayPolygon.map((e) => console.log("e", e)),
                    geometry: {
                      type: "Polygon",
                      coordinates: item.geometry.coordinates,
                    },
                  },
                });
              });
              // Polygon Fill
              arrayPolygon.map((item, i) => {
                map.addLayer({
                  id: `PolygonSource${i}`,
                  type: "fill",
                  source: `PolygonSource${i}`, // reference the data source
                  layout: {},
                  paint: {
                    "fill-color": item.properties.fill
                      ? item.properties.fill
                      : "#0080ff", // blue color fill
                    "fill-opacity": item.properties.fillOpacity
                      ? item.properties.fillOpacity
                      : 0.5,
                  },
                });
                // Polygon Outline
                map.addLayer({
                  id: `outline${i}`,
                  type: "line",
                  source: `PolygonSource${i}`,
                  layout: {},
                  paint: {
                    "line-color": "#000",
                    "line-width": 3,
                  },
                });
                // ============================== Layer Polygon End ====================
              });
            });
          }}
        />
      </div>
    </>
  );
}
