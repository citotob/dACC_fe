import React, { useRef, useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

import { kml } from "@tmcw/togeojson";

// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";

// import hardcode covnerted KML to geojson

// STYLE
import style from "./style.module.css";

// ASSETS
import pinIcon from "../../../assets/icons/pin-new48.png";
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
  // KML Map state
  const [dataGeoJSON, setdataGeoJSON] = useState([]);
  let filtered;

  useEffect(() => {
    // fetch("https://developers.google.com/kml/documentation/KML_Samples.kml")
    //   .then(function (response) {
    //     return response.text();
    //   })
    //   .then(function (xml) {
    //     let GeoJSON = kml(new DOMParser().parseFromString(xml, "text/xml"));
    //     // console.log("GEOJSON", GeoJSON);
    //     setdataGeoJSON(GeoJSON);
    //   });
  }, []);

  console.log("datageojson", dataGeoJSON);

  // console.log("dari map module", long, lati, lokasi);
  const mapRef = useRef();

  let arrayKML = [];

  if (dataGeoJSON.length !== 0) {
    dataGeoJSON.features.map((item) => arrayKML.push(item));
  }
  const [latCenter, setlatCenter] = useState("");
  const [longCenter, setlongCenter] = useState("");
  let iconImages = [];
  useEffect(() => {
    const DATA = import(`./KML_Google_Sample.json`);
    DATA.then((result) => {
      let features = result.default.features;
      setlatCenter(features[0].geometry.coordinates[0]);
      setlongCenter(features[0].geometry.coordinates[1]);
    });
  }, []);

  // let latCenter;
  // let longCenter;
  console.log("arrayKML", arrayKML);
  console.log("icon array ", iconImages);
  return (
    <>
      <div className={style.containerMapPolygon}>
        <Map
          ref={mapRef}
          zoom={[15]}
          // center coordinates indonesia

          center={[latCenter, longCenter]}
          // maxBounds hanya wilayah di di indonesia
          // maxBounds={[
          //   [-125.0011, 24.9493],
          //   [-66.9326, 49.5904],
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

            const DATA = import(`./KML_Google_Sample.json`);

            // const DATAPOLYGON = DATA.features.filter(
            //   (e) => e.geometry.type === "Point"
            // );
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

              // ============================== Layer Pin ====================

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
                          // get the title name from the source's "title" property
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
                          // get the title name from the source's "title" property
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
                          // get the title name from the source's "title" property
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
                          // get the title name from the source's "title" property
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

              // ============================== Layer Pin ====================

              // mau coba masukin load image untuk links
              map.loadImage(iconImages, (error, image) => {
                console.log("images ", image);
                // map.addImage("floatingIcon", image[0]);
                // map.addImage("extrudedIcon", image[1]);
                // map.addImage("rollIcon", image[2]);
                // // add other symbols
                // map.addLayer({
                //   id: "floating",
                //   type: "symbol",
                //   source: "points",
                //   layout: {
                //     "icon-image": "floatingIcon",
                //     // get the title name from the source's "title" property
                //     "text-field": ["get", "title"],
                //     "text-font": [
                //       "Open Sans Semibold",
                //       "Arial Unicode MS Bold",
                //     ],
                //     "text-offset": [0, 1.25],
                //     "text-anchor": "top",
                //   },
                // });
                // map.addLayer({
                //   id: "extruded",
                //   type: "symbol",
                //   source: "points",
                //   layout: {
                //     "icon-image": "extrudedIcon",
                //     // get the title name from the source's "title" property
                //     "text-field": ["get", "title"],
                //     "text-font": [
                //       "Open Sans Semibold",
                //       "Arial Unicode MS Bold",
                //     ],
                //     "text-offset": [0, 1.25],
                //     "text-anchor": "top",
                //   },
                // });
                // map.addLayer({
                //   id: "roll",
                //   type: "symbol",
                //   source: "points",
                //   layout: {
                //     "icon-image": "rollIcon",
                //     // get the title name from the source's "title" property
                //     "text-field": ["get", "title"],
                //     "text-font": [
                //       "Open Sans Semibold",
                //       "Arial Unicode MS Bold",
                //     ],
                //     "text-offset": [0, 1.25],
                //     "text-anchor": "top",
                //   },
                // });
              });

              // ========================================== DO NOT TOUCH

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

              // map.addLayer({
              //   id: `PolygonLayer`,
              //   type: "fill",
              //   maxzoom: 10,
              //   source: `PolygonSource`,
              //   layout: {
              //     visibility: "visible",
              //   },
              //   paint: {
              //     "fill-color": "#ffb95a",
              //     "fill-opacity": 0.9,
              //   },
              // });
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
                // Add a black outline around the polygon.
                map.addLayer({
                  id: `outline${i}`,
                  type: "line",
                  source: `PolygonSource${i}`,
                  layout: {},
                  paint: {
                    "line-color": "#000",
                    "line-width": 3,
                    "text-color": "#ffffff",
                  },
                });
              });

              // Add a symbol layer
            });
          }}
        />
      </div>
    </>
  );
}
