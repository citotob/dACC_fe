// GEOCODER
// import Geocoder from "@mapbox/react-geocoder";
// ASSETS
// import custom_marker from "../../../../assets/images/custom_marker.png";
import React, { useEffect, useRef, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";

//IMPORT CUSTOM STYLING
import styleContainer from "./style.module.css";
import style from "../style.module.css";

// Import API
import API from "../../../services";

//import loader
import Loader from "react-loader-spinner";

const Map = ReactMapboxGl({
  maxZoom: 20,
  minZoom: 1,
  //  Token mapboxGL
  accessToken: process.env.REACT_APP_MAPBOX_GL_TOKEN,
});

export default function MapTitik() {
  const [dataMapAI, setdataMapAI] = useState([]);
  const [dataMapBTS, setdataMapBTS] = useState([]);
  const [loading, setloading] = useState(false);

  const [activeTab, setactiveTab] = useState(1);
  const [AITabStyling, setAITabStyling] = useState(style.active);
  const [BTSTabStyling, setBTSTabStyling] = useState(style.inactive);

  useEffect(() => {
    setloading(true);
    API.getFilterAi()
      .then((res) => {
        // console.log("API success : ", res);
        if (res.data.success && res.data.values.length !== 0) {
          setdataMapAI(
            res.data.values.map((item) => ({
              count_AI: item?.count_AI,
              issue_AI: item?.issue_AI,
              provinsi: item?.provinsi,
              surveyed_AI: item?.surveyed_AI,
              unsurveryed_AI: item?.unsurveyed_AI,
            }))
          );

          setdataMapBTS(
            res.data.values.map((item) => ({
              count_BTS: item?.count_BTS,
              issue_BTS: item?.issue_BTS,
              provinsi: item?.provinsi,
              surveyed_BTS: item?.surveyed_BTS,
              unsurveryed_BTS: item?.unsurveyed_BTS,
            }))
          );
        } else {
          setdataMapAI(null);
          setdataMapBTS(null);
        }
        setloading(false);
      })
      .catch((err) => {
        // console.log("API success : ", err);
        setdataMapAI(null);
        setdataMapBTS(null);
        setloading(false);
      });
  }, []);

  // console.log("Data Map Ai ", dataMapAI);

  const mapRef = useRef();
  // const inputRef = useRef();

  // console.log("input ref ", inputRef?.current?.value);

  // Toggle visibility antara layer AI atau BTS
  const toggleMapLayer = (tab) => {
    if (tab === 1) {
      mapRef.current.state.map.setLayoutProperty(
        "PolygonLayerAI",
        "visibility",
        "visible"
      );
      mapRef.current.state.map.setLayoutProperty(
        "PolygonLayerBTS",
        "visibility",
        "none"
      );
    } else if (tab === 2) {
      mapRef.current.state.map.setLayoutProperty(
        "PolygonLayerAI",
        "visibility",
        "none"
      );
      mapRef.current.state.map.setLayoutProperty(
        "PolygonLayerBTS",
        "visibility",
        "visible"
      );
    }
  };

  return (
    <>
      <div className={styleContainer.containerMapPolygon}>
        {loading ? (
          <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <Loader
              type='Puff'
              color='#A8D0DA'
              height={60}
              width={60}
              loading={loading}
            />
          </div>
        ) : dataMapAI && dataMapBTS ? (
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
                map.addSource(`PolygonSourceAI`, {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    name: "merged",
                    crs: {
                      type: "name",
                      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                    },

                    features: result.features.map((item) => {
                      const filterDataMap = dataMapAI.filter((f) => {
                        if (
                          f?.provinsi !== undefined &&
                          item?.properties?.idfetch !== undefined
                        ) {
                          return (
                            f?.provinsi?.toLowerCase() ===
                            item?.properties?.idfetch?.toLowerCase()
                          );
                        }
                      });
                      return {
                        type: "Feature",
                        id: item?.id,
                        properties: {
                          id: item?.properties?.id,
                          pk: item?.properties?.pk,
                          south: item?.properties?.south,
                          west: item?.properties?.west,
                          north: item?.properties?.north,
                          east: item?.properties?.east,
                          code: item?.properties?.code,
                          idfetch: item?.properties?.idfetch,
                          provinsi: item?.properties?.provinsi,
                          // ---- tambahan data dari API
                          count_AI:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].count_AI ?? "-"
                              : "-",
                          issue_AI:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].issue_AI ?? "-"
                              : "-",
                          surveyed_AI:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].surveyed_AI ?? "-"
                              : "-",
                          unsurveryed_AI:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].unsurveryed_AI ?? "-"
                              : "-",
                        },
                        geometry: {
                          type: "MultiPolygon",
                          coordinates: item?.geometry?.coordinates,
                        },
                      };
                    }),
                  },
                });

                map.addSource(`PolygonSourceBTS`, {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    name: "merged",
                    crs: {
                      type: "name",
                      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
                    },

                    features: result.features.map((item) => {
                      const filterDataMap = dataMapBTS.filter((f) => {
                        if (
                          f?.provinsi !== undefined &&
                          item?.properties?.idfetch !== undefined
                        ) {
                          return (
                            f?.provinsi?.toLowerCase() ===
                            item?.properties?.idfetch?.toLowerCase()
                          );
                        }
                      });
                      return {
                        type: "Feature",
                        id: item?.id,
                        properties: {
                          id: item?.properties?.id,
                          pk: item?.properties?.pk,
                          south: item?.properties?.south,
                          west: item?.properties?.west,
                          north: item?.properties?.north,
                          east: item?.properties?.east,
                          code: item?.properties?.code,
                          idfetch: item?.properties?.idfetch,
                          provinsi: item?.properties?.provinsi,
                          // ---- tambahan data dari API
                          count_BTS:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].count_BTS ?? "-"
                              : "-",
                          issue_BTS:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].issue_BTS ?? "-"
                              : "-",
                          surveyed_BTS:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].surveyed_BTS ?? "-"
                              : "-",
                          unsurveryed_BTS:
                            filterDataMap.length !== 0 && filterDataMap
                              ? filterDataMap[0].unsurveryed_BTS ?? "-"
                              : "-",
                        },
                        geometry: {
                          type: "MultiPolygon",
                          coordinates: item?.geometry?.coordinates,
                        },
                      };
                    }),
                  },
                });

                // ==== ADD LAYER POLIGON UNTUK AKSES INTERNET
                map.addLayer({
                  id: `PolygonLayerAI`,
                  type: "fill",
                  maxzoom: 10,
                  source: `PolygonSourceAI`,
                  layout: {
                    visibility: "visible",
                  },
                  paint: {
                    "fill-color": "#FFAA4C",
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

                // ==== ADD LAYER POLIGON UNTUK BTS
                map.addLayer({
                  id: `PolygonLayerBTS`,
                  type: "fill",
                  maxzoom: 10,
                  source: `PolygonSourceBTS`,
                  layout: {
                    visibility: "none",
                  },
                  paint: {
                    "fill-color": "#035397",
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

                map.on("mousemove", `PolygonLayerAI`, function (e) {
                  let popInfo = `
                    <div style="line-height: 10px">                  
                      <p style="font-weight: 700;"> Provinsi : ${e.features[0].properties.provinsi} </p>
                      <p> Total lokasi : ${e.features[0].properties.count_AI} </p>
                      <p> Lokasi sudah disurvey : ${e.features[0].properties.surveyed_AI} </p>
                      <p> Lokasi belum disurvey : ${e.features[0].properties.unsurveryed_AI} </p>
                      <p> Total issue temuan : ${e.features[0].properties.issue_AI} </p>
                    </div>
                  `;

                  map.getCanvas().style.cursor = "pointer";
                  if (e.features.length > 0) {
                    if (hoveredStateId) {
                      map.setFeatureState(
                        { source: `PolygonSourceAI`, id: hoveredStateId },
                        { hover: "default" }
                      );
                      popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(map);
                    }

                    hoveredStateId = e.features[0].properties.id;

                    map.setFeatureState(
                      { source: `PolygonSourceAI`, id: hoveredStateId },
                      { hover: "hover" }
                    );
                  }
                });

                map.on("mousemove", `PolygonLayerBTS`, function (e) {
                  let popInfo = `
                    <div style="line-height: 10px">                  
                      <p style="font-weight: 700;"> Provinsi : ${e.features[0].properties.provinsi} </p>
                      <p> Total lokasi : ${e.features[0].properties.count_BTS} </p>
                      <p> Lokasi sudah disurvey : ${e.features[0].properties.surveyed_BTS} </p>
                      <p> Lokasi belum disurvey : ${e.features[0].properties.unsurveryed_BTS} </p>
                      <p> Total issue temuan : ${e.features[0].properties.issue_BTS} </p>
                    </div>
                  `;

                  map.getCanvas().style.cursor = "pointer";
                  if (e.features.length > 0) {
                    if (hoveredStateId) {
                      map.setFeatureState(
                        { source: `PolygonSourceBTS`, id: hoveredStateId },
                        { hover: "default" }
                      );
                      popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(map);
                    }

                    hoveredStateId = e.features[0].properties.id;

                    map.setFeatureState(
                      { source: `PolygonSourceBTS`, id: hoveredStateId },
                      { hover: "hover" }
                    );
                  }
                });

                map.on("mouseleave", `PolygonLayerAI`, function () {
                  map.getCanvas().style.cursor = "";
                  popup.remove();
                });

                map.on("mouseleave", `PolygonLayerBTS`, function () {
                  map.getCanvas().style.cursor = "";
                  popup.remove();
                });
              });
            }}
          />
        ) : (
          "Terjadi kesalahan"
        )}
      </div>
    </>
  );
}
