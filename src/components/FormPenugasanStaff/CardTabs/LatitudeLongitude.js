import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Import Style
import style from "./style.module.scss";

import DetailInput from "./DetailInput.js";

// import redux
import { setBtsMain, setSection3 } from "../../../store/formSurveyStaff/action";

function LatitudeLongitude(props) {
  const location = useLocation();
  const kodeSurvey = location.state.datatable._id;
  const kode = location.state.datatable.kode;

  // == LOCAL STORAGE
  let strSection3 = "section3";
  let localSection3 = JSON.parse(
    window.localStorage.getItem(strSection3.concat(kodeSurvey))
  );
  let strBtsMain = "btsMain";
  let localBtsMain = JSON.parse(
    window.localStorage.getItem(strBtsMain.concat(kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section3 = useSelector(
    (state) => state.FormSurveyStaff.btsMain.section3
  );

  let koordinatlat = eval(
    "btsMain?.section" +
      props.section +
      "?." +
      props.latLabel
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()
  );

  let koordinatlon = eval(
    "btsMain?.section" +
      props.section +
      "?." +
      props.lonLabel
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase()
  );

  // // lat long states
  const [geoLat, setGeoLat] = useState("");
  const [geoLong, setGeoLong] = useState("");

  const toggleLatValue = () => {
    // dispatch(setSection3({ ...section3, koordinatgpswgs84_lat: geoLat }));
    dispatch(
      setBtsMain({
        ...btsMain,
        ["section" + props.section]: {
          ...eval("btsMain.section" + props.section),
          [props.latLabel
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "")
            .toLowerCase()]: geoLat,
        },
      })
    );
  };
  const toggleLongValue = () => {
    // dispatch(setSection3({ ...section3, koordinatgpswgs84_long: geoLong }));
    dispatch(
      setBtsMain({
        ...btsMain,
        ["section" + props.section]: {
          ...eval("btsMain.section" + props.section),
          [props.lonLabel
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "")
            .toLowerCase()]: geoLong,
        },
      })
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeoLat(position.coords.latitude.toFixed(5));
      setGeoLong(position.coords.longitude.toFixed(5));
    });
  }, []);

  return (
    <div>
      {/* ================================================================ BATAS LATITUDE LONGITUDE ===============  */}
      <div className={`d-flex flex-row align-items-end gap16`}>
        <DetailInput
          label={props.latLabel}
          section={props.section}
          type='number'
          value={koordinatlat?.replace(/(\.\d{5})\d+/g, "$1") ?? ""}
          message={
            koordinatlat < -90 || koordinatlat > 90
              ? "Must be between -90 an 90!"
              : ""
          }
          inputWidth='40%'
        />
        <button
          className={`${style.buttonAutofill} px-2 py-1`}
          onClick={() => {
            toggleLatValue();
          }}
        >
          Get Latitude
        </button>
      </div>
      {/* ================================================================ BATAS LATITUDE  ===============  */}
      {/* ================================================================ BATAS LONGITUDE ===============  */}
      <div className={`d-flex flex-row align-items-end gap16`}>
        <DetailInput
          label={props.lonLabel}
          section={props.section}
          type='number'
          value={koordinatlon?.replace(/(\.\d{5})\d+/g, "$1") ?? ""}
          message={
            koordinatlon < -180 || koordinatlon > 180
              ? "Must be between -180 an 180!"
              : ""
          }
          inputWidth='40%'
        />
        <button
          className={`${style.buttonAutofill} px-2 py-1`}
          onClick={() => {
            toggleLongValue();
          }}
        >
          Get Longitude
        </button>
      </div>
      {/* ================================================================ BATAS LONGITUDE ===============  */}
    </div>
  );
}

export default LatitudeLongitude;
