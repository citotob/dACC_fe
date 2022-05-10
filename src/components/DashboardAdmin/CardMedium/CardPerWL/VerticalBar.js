import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

//IMPORT CUSTOM STYLING
// import style from "../style.module.css";

import moment from "moment";
function VerticalBar({ dataChart }) {
  const [dataDates, setdataDates] = useState([
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
  ]);
  const [dataBar, setdataBar] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (dataChart && dataChart.length !== 0) {
      setdataDates([
        `${moment(dataChart[0]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[1]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[2]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[3]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[4]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[5]?.tanggal).format("Do MMM YY")}`,
        `${moment(dataChart[6]?.tanggal).format("Do MMM YY")}`,
      ]);
      setdataBar([
        `${dataChart[0]?.nilai}`,
        `${dataChart[1]?.nilai}`,
        `${dataChart[2]?.nilai}`,
        `${dataChart[3]?.nilai}`,
        `${dataChart[4]?.nilai}`,
        `${dataChart[5]?.nilai}`,
        `${dataChart[6]?.nilai}`,
      ]);
    }
  }, []);

  const data = {
    labels: dataDates,
    datasets: [
      {
        label: "Jumlah lokasi survey",
        data: dataBar,
        backgroundColor: [
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
          "rgba(64, 109, 150, 0.2)",
        ],
        borderColor: [
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
          "rgba(64, 109, 150, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Bar data={data} options={options} height={270} />
    </>
  );
}

export default VerticalBar;
