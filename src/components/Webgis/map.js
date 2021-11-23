import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import axios from "axios";
import _ from "underscore";
import styles from "./styles.module.css";

class Maps extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      ai: true,
      bts: false,
    };
    this.mapRef = React.createRef();

    this.handleAI = this.handleAI.bind(this);
    this.handleBTS = this.handleBTS.bind(this);
  }
  //clicked toggle ai
  handleAI = () => {
    this.setState({ ai: true });
    this.setState({ bts: false });
  };

  //clicked toggle bts
  handleBTS = () => {
    this.setState({ bts: true });
    this.setState({ ai: false });
  };

  render() {

    //state toggle
    const { ai, bts } = this.state;
    var bounds = [
      [-8.371976, 95.678406],
      [4.259506, 140.73472],
    ];
    //create map
    const Map = ReactMapboxGl({
      maxZoom: 20,
      minZoom: 1,
      accessToken:
        "pk.eyJ1IjoiamF3YXN0cmVzcyIsImEiOiJjanBjc3cwOWIxNzVrM3Fta2R1NGZmdW12In0.ra1FXvu_TM9MmhiL7VZuqA",
    });
    let hoveredStateId = null;
    const containerCSS = {
      boxSizing: "border-box",
      height: "100%",
      backgroundColor: "white",
      display: "block",
      width: "100%",
    };

    const mapCSS = {
      boxSizing: "border-box",
      height: "20rem",
      backgroundColor: "white",
      display: "block",
      width: "100%",
    };

    return (
      <Card className={styles.total_card}>
        <CardBody>
          <Fragment>
            <div style={containerCSS}>
              <div className={"d-none d-md-block"}>
                <div className={"d-flex align-items-end justify-content-between"}>
                  <h6>
                    <b>Map Persebaran Lokasi Survey</b>
                  </h6>
                  <div className={"d-flex align-items-end justify-content-around mb-2"}>
                    <Button size="sm" onClick={this.handleAI} className={this.state.ai && styles.btnAI}>
                      Akses Internet
                </Button>
                    <Button
                      size="sm"
                      onClick={this.handleBTS}
                      className={`${this.state.bts && styles.btnBTS} ml-2`}>
                      BTS
                </Button>
                  </div>
                </div>
              </div>

              <div className={"d-block d-md-none"}>
                <h6>
                  <b>Map Persebaran Lokasi Survey</b>
                </h6>
                <Button size="sm" onClick={this.handleAI} className={this.state.ai && styles.btnAI}>
                  Akses Internet
            </Button>
                <Button
                  size="sm"
                  onClick={this.handleBTS}
                  className={`${this.state.bts && styles.btnBTS} ml-2`}>
                  BTS
            </Button>
              </div>

              <Map
                ref={this.mapRef}
                zoom={[1.5]}
                center={[118.0148634, -2.548926]}
                maxBounds={[
                  [91.549305, -13.817646],
                  [145.909655, 9.339755],
                ]}
                style={"mapbox://styles/mapbox/light-v10"}
                containerStyle={mapCSS}
                onStyleLoad={async (map, load) => {
                  const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                  });
                  const popupkabkot = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                  });
                  const reference = this.infoWindowRef;
                  const refMap = this.mapRef;

                  axios
                    .get(`${process.env.REACT_APP_BE_URL}/survey/getpenugasan/count/provinsi`)
                    .then(async (res) => {
                      const INDONESIA = await import("./files/INDONESIA.json");
                      // mapping provinsi data to provinsi layer
                      _.map(INDONESIA.features, function (p) {
                        _.map(res.data.values, function (key, value) {
                          if (p.properties.idfetch === key.provinsi) {
                            p.properties.provinsi = key.provinsi;
                            p.properties.count_AI = key.count_AI;
                            p.properties.count_BTS = key.count_BTS;
                            p.properties.surveyed_AI = key.surveyed_AI;
                            p.properties.surveyed_BTS = key.surveyed_BTS;
                            p.properties.unsurveyed_AI = key.unsurveyed_AI;
                            p.properties.unsurveyed_BTS = key.unsurveyed_BTS;
                            p.properties.issue_AI = key.issue_AI;
                            p.properties.issue_BTS = key.issue_BTS;
                          }
                        });
                      });

                      return [INDONESIA];
                    })
                    .then((result) => {
                      map.addSource("indonesiaSource", {
                        type: "geojson",
                        data: result[0],
                      });

                      map.addLayer({
                        id: "indonesiaLayer",
                        type: "fill",
                        maxzoom: 10,
                        source: "indonesiaSource",
                        layout: {
                          visibility: "visible",
                        },
                        paint: {
                          "fill-color": ai ? "#2C3780" : "#E57B7B",
                          "fill-opacity": [
                            "case",
                            ["==", ["feature-state", "hover"], "hover"],
                            0.4,
                            ["==", ["feature-state", "hover"], "default"],
                            0.8,
                            0.8,
                          ],
                        },
                      });

                      map.addControl(new mapboxgl.FullscreenControl());

                      map.on("mousemove", "indonesiaLayer", function (e) {
                        let popInfo;

                        ai
                          ? (popInfo = `
                        <span style="display: block;">Provinsi : ${e.features[0].properties.provinsi
                            }</span>
                        <span style="display: block;">Total Lokasi: ${e.features[0].properties.count_AI ?? 0
                            }</span>
                        <span style="display: block;">Lokasi Sudah disurvey: ${e.features[0].properties.surveyed_AI ?? 0
                            }</span>
                        <span style="display: block;">Lokasi Belum disurvey: ${e.features[0].properties.unsurveyed_AI ?? 0
                            }</span>
                        <span style="display: block;">Total Issue Temuan: ${e.features[0].properties.issue_AI ?? 0
                            }</span>
                        `)
                          : (popInfo = `
                        <span style="display: block;">Provinsi : ${e.features[0].properties.provinsi
                            }</span>
                        <span style="display: block;">Total Lokasi: ${e.features[0].properties.count_BTS ?? 0
                            }</span>
                        <span style="display: block;">Lokasi Sudah disurvey: ${e.features[0].properties.surveyed_BTS ?? 0
                            }</span>
                        <span style="display: block;">Lokasi Belum disurvey: ${e.features[0].properties.unsurveyed_BTS ?? 0
                            }</span>
                        <span style="display: block;">Total Issue Temuan: ${e.features[0].properties.issue_BTS ?? 0
                            }</span>
                        `);

                        map.getCanvas().style.cursor = "pointer";
                        if (e.features.length > 0) {
                          if (hoveredStateId) {
                            map.setFeatureState(
                              { source: "indonesiaSource", id: hoveredStateId },
                              { hover: "default" }
                            );
                            popup.setLngLat(e.lngLat).setHTML(popInfo).addTo(map);
                          }

                          hoveredStateId = e.features[0].properties.id;

                          map.setFeatureState(
                            { source: "indonesiaSource", id: hoveredStateId },
                            { hover: "hover" }
                          );
                        }
                      });

                      map.on("mouseleave", "indonesiaLayer", function () {
                        map.getCanvas().style.cursor = "";
                        popup.remove();
                      });
                    });
                }}></Map>
            </div>
          </Fragment>
        </CardBody>
      </Card>
    );
  }
}

export default Maps;
