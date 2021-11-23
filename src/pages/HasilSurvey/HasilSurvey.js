import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/HasilSurvey/TableBootstrap/TableBootstrap";
import TableAdminSurveyor from "../../components/HasilSurveyAdminSurveyor/TableBootstrap/TableBootstrap";
import TableStaffSurveyor from "../../components/HasilSurveyStaffSurveyor/TableBootstrap/TableBootstrap";

function HasilSurvey() {
  // redux
  const breadcrumbItem = useSelector((state) => state.breadcrumbItem);

  const role = window.localStorage.getItem("roleName");
  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // modal states
  const [modalAddDataOpen, setmodalAddDataOpen] = useState(false);
  // modal functions

  //alert state
  const [alertAddDataStatus, setalertAddDataStatus] = useState(
    style.alertAddDataOff
  );

  function tog_AddData() {
    setmodalAddDataOpen(!modalAddDataOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  return (
    <div className={style.pageFont}>
      <div className={`${alertAddDataStatus}`}></div>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
            </div>
          </div>
          <div>
            <Breadcrumbs
              title='Hasil Survey'
              titleLink={`/${role}/hasil-survey`}
            />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          {role === "admin" && <Table />}
          {role === "adminsurveyor" && <TableAdminSurveyor />}
          {role === "staffsurveyor" && <TableStaffSurveyor />}
        </div>
      </div>
    </div>
  );
}

export default HasilSurvey;
