import React from "react";
import LineChart from "../../../../components/ModuleGraphic/ChartJS/LineChart/LineChart";
import LineToast from "../../../../components/ModuleGraphic/ToastUI/LineChart/LineChart";

//STYLE
import style from "./style.module.css";

export default function ModuleMapPolygon() {
  return (
    <div className={`container-fluid ${style.containerPageModuleMap}`}>
      {/* CHART JS */}
      <div>
        <div className="text-center">
          <label>Source: </label>
          <a
            href="https://reactchartjs.github.io/react-chartjs-2/#/line"
            target="blank"
          >
            LINE REACT CHART JS 2 DOCUMENTATION
          </a>
        </div>
        <div className="font-weight-bold">LINE CHART JS (RESPONSIVE)</div>
        <div className="container">
          <LineChart />
        </div>
      </div>
      {/* TOAST UI */}
      <div className="mt-5">
        <div className="text-center">
          <label>Source: </label>
          <a
            href="https://nhn.github.io/tui.chart/latest/tutorial-example08-01-line-chart-basic"
            target="blank"
          >
            LINE TOAST UI DOCUMENTATION
          </a>
        </div>
        <div className="font-weight-bold">LINE TOAST UI</div>
        <div className="container">
          <LineToast chartWidth="800" />
        </div>
      </div>
    </div>
  );
}
