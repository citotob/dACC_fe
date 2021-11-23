import React from "react";

import "tui-chart/dist/tui-chart.css";
import { PieChart } from "@toast-ui/react-chart";
import TuiChart from "tui-chart";

var theme = {
  series: {
    colors: ["#556ee6", "#34c38f", "#f46a6a", "#50a5f1", "#f1b44c"],
    label: {
      color: "#fff",
    },
  },
};
TuiChart.registerTheme("skoteTheme", theme);

const PieChartToast = (props) => {
  const data = {
    categories: ["Browser"],
    series: [
      {
        name: "Chrome",
        data: 46.02,
      },
      {
        name: "IE",
        data: 20.47,
      },
      {
        name: "Firefox",
        data: 17.71,
      },
      {
        name: "Safari",
        data: 5.45,
      },
      {
        name: "Etc",
        data: 10.35,
      },
    ],
  };

  const options = {
    chart: {
      width: props.chartWidth,
      height: 380,
      title: "Usage share of web browsers",
    },
    tooltip: {
      suffix: "%",
    },
  };

  const optionsDonut = {
    chart: {
      width: props.chartWidth,
      height: 380,
      title: "Usage share of web browsers",
    },
    series: {
      radiusRange: ["40%", "100%"],
      showLabel: true,
    },
    tooltip: {
      suffix: "%",
    },
  };

  return (
    <React.Fragment>
      <PieChart
        data={data}
        options={props.type === "PieChart" ? options : optionsDonut}
      />
    </React.Fragment>
  );
};
export default PieChartToast;
