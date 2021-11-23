import React from "react";
import MapPolygon from "../../../components/ModuleMap/MapPolygon/MapPolygon";

//STYLE
import style from "./style.module.css";

export default function ModuleMapPolygon() {
  return (
    <div className={`container-fluid ${style.containerPageModuleMap}`}>
      <div className="font-weight-bold">MAP POLYGON (With Popup on Hover)</div>
      <div>
        <MapPolygon />
      </div>
    </div>
  );
}
