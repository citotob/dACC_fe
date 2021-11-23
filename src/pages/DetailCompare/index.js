import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// IMPORT STYLE
import style from "./style.module.scss";

// IMPORT CARDS
import CardDetail from "../../components/DetailCompare/CardDetail";
import CardInfo from "../../components/DetailCompare/CardInfo";
import CardBack from "../../components/DetailCompare/CardBack";
import CardSearch from "../../components/DetailCompare/CardSearch";
import API from "../../services";

function DetailCompare(props) {
  const location = useLocation();

  // states
  const [datatable, setDatatable] = useState([]);

  const [btsData, setbtsData] = useState([]);
  const kode = datatable.kode;
  const activeTab = location.state?.activeTab;

  // const handleSearchCompare = () => {
  //   let params = {};
  //   API.searchHasilBTS()
  //     .then((res) => {
  //       if (res.data.success && res.status === 200) {
  //         console.log("API SUCCESS :  > ", res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("API FAIL :  > ", err.response);
  //     });
  // };

  // get data dropdown kode
  const getDropdownKodeList = () => {
    API.getHasilBTSAll()
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS Ambil Kode :  > ", res);
          setDatatable(res.data.values);
        }
      })
      .catch((err) => {
        console.error("API FAIL Ambil Kode:  > ", err.response);
      });
  };

  useEffect(() => {
    getDropdownKodeList();
  }, []);

  return (
    <div className={style.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between mb-4'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4`}>
                Compare Hasil Survey
              </span>
            </div>
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardSearch data={datatable} />
        {/* <CardDetail datatable={datatable} btsData={btsData} /> */}
        <CardInfo />
        {/* <CardConfirm datatable={datatable} activeTab={activeTab} /> */}
        <CardBack />
      </div>
    </div>
  );
}

export default DetailCompare;
