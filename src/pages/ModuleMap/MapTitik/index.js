import React from "react";
import MapTitik from "../../../components/ModuleMap/MapTitik/MapTitik";

//STYLE
import style from "./style.module.css";

export default function ModuleMapTitik() {
  return (
    <div className={`container-fluid ${style.containerPageModuleMap}`}>
      <div className="font-weight-bold">MAP TITIK (With Popup on Hover)</div>
      <div>
        <MapTitik />
      </div>
    </div>
  );
}
