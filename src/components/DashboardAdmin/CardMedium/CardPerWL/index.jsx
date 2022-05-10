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

import NumberFormat from 'react-number-format';

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

  const [whitelabel, setWhitelabel] = useState([]);
  const [selectedWhitelabel, setSelectedWhitelabel] = useState("");
  const [dataTrans, setdataTrans] = useState([]);

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

  const getWLData = () => {
    API.getWL()
      .then((res) => {
        const wlData = res?.data?.values ?? "";
        if (res.status === 200) {
          setWhitelabel(wlData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getDashTotalTransPerWL = (data) => {
    setloading(true);
    let params = new URLSearchParams();
    params.append("WL", data);
    API.getTotalTransPerWL(params)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : Get Dashboard Chart AI Data > ", res);
          setdataTrans(res.data.values);
        }
        setloading(false);
      })
      .catch((err) => {
        console.log("API FAIL : Get Dashboard Chart AI Data > ", err);
        setloading(false);
      });
  };

  useEffect(() => {
    getWLData();
  }, [selectedWhitelabel, activeTab]);

  return (
    <div className="col col-lg-12 col-m-24 col-s-24">
      {/* BOX PUTIH  */}
      {/* <div className={`${style.cardMediumWrapper} px-4`}> */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div className={`${style.cardMediumLabel}`}>
            <p>Total Depo dan WD per WL</p>
          </div>
          <div className={`${style.cardMediumButtonsWrapper}`}>
            <div className={`${style.cardMediumChartFilter}`}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <select
                  name='whitelabel'
                  onChange={(e) => {
                    setSelectedWhitelabel(e.target.value);
                    getDashTotalTransPerWL(e.target.value);
                  }}
                  className={`form-control form-group ${style.placeholder}`}
                >
                  <option className={style.placeholder}>
                    Pilih White Label
                  </option>
                  {whitelabel && whitelabel.length !== 0 ? (
                    whitelabel?.map((whitelabel, index) => {
                      return (
                        <option
                          className={style.placeholder}
                          value={whitelabel?.id}
                          key={index}
                        >
                          {whitelabel?.name ?? "Pilih White Label"}
                        </option>
                      );
                    })
                  ) : (
                    <option className={style.placeholder}>
                      Pilih White Label
                    </option>
                  )}
                </select>
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
        ) : dataTrans && dataTrans.length !== 0 ? (
          <div className={`${style.cardMediumLabel}`}>
            <p>Total Depo Harian : <NumberFormat value={dataTrans?.depo_daily} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
            <p>Total Depo Mingguan : <NumberFormat value={dataTrans?.depo_weekly} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
            <p>Total Depo Bulanan : <NumberFormat value={dataTrans?.depo_monthly} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
            <p>Total WD Harian : <NumberFormat value={dataTrans?.wd_daily} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
            <p>Total WD Mingguan : <NumberFormat value={dataTrans?.wd_weekly} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
            <p>Total WD Bulanan : <NumberFormat value={dataTrans?.wd_monthly} displayType={'text'} thousandSeparator={true} prefix={'Rp '}
                        decimalScale={0} /></p>
          </div>
        ) : (
          <div className={`${style.cardMediumLabel}`}>
            <div><p>No Data</p></div>
          </div>       
        )}
      </div>
    </div>
  );
}

export default Index;
