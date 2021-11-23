import React from "react";
import PieChart from "../../../../components/ModuleGraphic/ChartJS/PieChart/PieChart";
import PieToast from "../../../../components/ModuleGraphic/ToastUI/PieChart/PieChart";

//STYLE
import style from "./style.module.css";

export default function ModuleMapPolygon() {
  return (
    <div className={`container-fluid ${style.containerPageModuleMap}`}>
      <div className="font-weight-bold">DOUGHNAT & PIE CHART JS</div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <PieChart type="DoughnatChart" />
          </div>
          <div className="col-6">
            <PieChart type="PieChart" />
          </div>
        </div>
      </div>
      <div className="font-weight-bold mt-5">DOUGHNAT & PIE TOAST UI</div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <PieToast type="DoughnatChart" />
          </div>
          <div className="col-6">
            <PieToast type="PieChart" />
          </div>
        </div>
      </div>
    </div>
  );
}
