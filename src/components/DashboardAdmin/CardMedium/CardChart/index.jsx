import React, { useState, useEffect } from "react";
import VerticalBar from "./VerticalBar";
import "react-datepicker/dist/react-datepicker.css";

// IMPORTS FROM MODULEFILTER
import moment from "moment";
import FilterCalendar from "../../../../components/ModuleFilter/FilterDate/FilterDate";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

// import api
import API from "../../../../services/index";

//import loader
import Loader from "react-loader-spinner";

// var dateFormat = require("dateformat");

function Index() {
  // nge set initial dates
  let initialEndDate = new Date();
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 6);
  initialEndDate = moment(initialEndDate);
  initialStartDate = moment(initialStartDate);

  // states
  const [dataChart, setdataChart] = useState([]);
  const [loading, setloading] = useState(false);
  const [activeTab, setactiveTab] = useState(1); // 1 is akses internet 2 is bts
  const [AITabStyling, setAITabStyling] = useState(style.active);
  const [BTSTabStyling, setBTSTabStyling] = useState(style.inactive);

  // ============== FROM MODULE FILTER START
  const [modalCalendar, setModalCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${initialStartDate.format("DD-MM-YYYY")} - ${initialEndDate.format(
      "DD-MM-YYYY"
    )}`
  ); // untuk value input
  const [selectedStartDate, setselectedStartDate] = useState(
    `${initialStartDate.format("YYYY-MM-DD 00:00:00")}`
  );
  const [selectedEndDate, setselectedEndDate] = useState(
    `${initialEndDate.format("YYYY-MM-DD 23:59:59")}`
  );
  const [tanggal, setTanggal] = useState("");

  const toggleModalCalendar = () => {
    setModalCalendar(!modalCalendar);
  };

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("DD-MM-YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  //return filtered data
  const handleSelectedDate = (date) => {
    let startDate = moment(date[0].startDate);
    let endDate = moment(date[0].endDate);
    setSelectedDate(
      `${startDate.format("DD-MM-YYYY")} - ${endDate.format("DD-MM-YYYY")}`
    );
    setselectedStartDate(
      moment(date[0].startDate).format("YYYY-MM-DD 00:00:00")
    );
    setselectedEndDate(
      moment(date[0].startDate).add(6, "days").format("YYYY-MM-DD 23:59:59")
    );
    setTanggal(enumerateDaysBetweenDates(startDate, endDate));
  };
  // ============== FROM MODULE FILTER END

  const getSurveyData = () => {
    setloading(true);
    let formData = new FormData();
    formData.append("from", selectedStartDate);
    formData.append("to", selectedEndDate);

    if (activeTab === 1) {
      API.getSurveyByDateAI(formData)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS : Get Dashboard Chart AI Data > ", res);
            setdataChart(res.data.values);
          }
          setloading(false);
        })
        .catch((err) => {
          console.log("API FAIL : Get Dashboard Chart AI Data > ", err);
          setloading(false);
        });
    } else if (activeTab === 2) {
      API.getSurveyByDateBTS(formData)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS : Get Dashboard Chart BTS Data > ", res);
            setdataChart(res.data.values);
          }
          setloading(false);
        })
        .catch((err) => {
          console.log("API FAIL : Get Dashboard Chart BTS Data > ", err);
          setloading(false);
        });
    }
  };

  useEffect(() => {
    getSurveyData();
  }, [selectedDate, activeTab]);

  return (
    <div className="col col-lg-6 col-m-12 col-s-12">
      {/* BOX PUTIH  */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div className={`${style.cardMediumLabel}`}>
            <p>Update Penambahan Lokasi Sudah Disurvey</p>
          </div>
          <div className={`${style.cardMediumButtonsWrapper}`}>
            <div className={`${style.cardMediumButtons}`}>
              <button
                className={`${AITabStyling}`}
                onClick={() => {
                  if (dataChart.length !== 0 && dataChart) {
                    setactiveTab(1);
                    setAITabStyling(style.active);
                    setBTSTabStyling(style.inactive);
                  }
                }}
              >
                Akses Internet
              </button>
              <button
                className={`${BTSTabStyling}`}
                onClick={() => {
                  if (dataChart.length !== 0 && dataChart) {
                    setactiveTab(2);
                    setAITabStyling(style.inactive);
                    setBTSTabStyling(style.active);
                  }
                }}
              >
                BTS
              </button>
            </div>
            <div className={`${style.cardMediumChartFilter}`}>
              <FilterCalendar
                modalCalendar={modalCalendar}
                toggleModalCalendar={toggleModalCalendar}
                selectedDate={handleSelectedDate}
              />
              <div className="d-flex flex-row justify-content-center align-items-center">
                <input
                  type="text"
                  onClick={toggleModalCalendar}
                  value={selectedDate}
                  style={{ width: "200px" }}
                  onChange={() => console.log("Date selected")}
                />
                <span
                  className="mdi mdi-18px mdi-calendar-range ml-2"
                  onClick={toggleModalCalendar}
                />
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center my-auto">
            <Loader
              type="Puff"
              color="#A8D0DA"
              height={60}
              width={60}
              loading={loading}
            />
          </div>
        ) : dataChart && dataChart.length !== 0 ? (
          <div className={`${style.chartWrapper}`}>
            <VerticalBar dataChart={dataChart} />
          </div>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
}

export default Index;
