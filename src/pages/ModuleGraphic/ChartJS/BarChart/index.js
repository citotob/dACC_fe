import React from "react";
import VerticalBarChart from "../../../../components/ModuleGraphic/ChartJS/BarChart/VerticalBarChart";
import VerticalBarToast from "../../../../components/ModuleGraphic/ToastUI/BarChart/VerticalBarChart";
import HorizontalBarChart from "../../../../components/ModuleGraphic/ChartJS/BarChart/HorizontalBarChart";
import HorizontalBarToast from "../../../../components/ModuleGraphic/ToastUI/BarChart/HorizontalBarChart";

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
            href="https://reactchartjs.github.io/react-chartjs-2/#/vertical-bar"
            target="blank"
          >
            BAR REACT CHART JS 2 DOCUMENTATION
          </a>
        </div>
        <div className="font-weight-bold">
          VERTICAL BAR CHART JS (RESPONSIVE)
        </div>
        <div className="container">
          <VerticalBarChart />
        </div>
      </div>

      {/* TOAST UI */}
      <div className="mt-5">
        <div className="text-center">
          <label>Source: </label>
          <a
            href="https://nhn.github.io/tui.chart/latest/tutorial-example02-01-bar-chart-basic"
            target="blank"
          >
            BAR TOAST UI DOCUMENTATION
          </a>
        </div>
        <div className="font-weight-bold">VERTICAL BAR TOAST UI</div>
        <div className="container">
          <VerticalBarToast chartWidth="700" />
        </div>
        <div className="font-weight-bold mt-5">HORIZONTAL BAR TOAST UI</div>
        <div className="container">
          <HorizontalBarToast chartWidth="700" />
        </div>
      </div>

      {/* <div className="font-weight-bold">HORIZONTAL BAR CHART JS</div>
      <div className="container">
        <HorizontalBarChart />
      </div> */}
    </div>
  );
}
