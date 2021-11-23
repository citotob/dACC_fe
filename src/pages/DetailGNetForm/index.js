import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// IMPORT STYLE
import style from "./style.module.scss";

// IMPORT CARDS
import CardDetail from "../../components/DetailGNetForm/CardDetail";
import CardInfo from "../../components/DetailGNet/CardInfo";
import CardForm from "../../components/DetailGNetForm/CardForm";
import CardConfirm from "../../components/DetailGNetForm/CardConfirm";

function DetailGNetForm() {
  const location = useLocation();
  const datatable = location.state?.datatable;
  const activeTab = location.state?.activeTab;

  return (
    <div className={style.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between mb-4'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4`}>G-NetTrack Form</span>
            </div>
          </div>
          <div>
            <Breadcrumbs title='G-NetTrack' breadcrumbItem='Form' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardDetail datatable={datatable} />
        <CardInfo datatable={datatable} card={true} />
        <CardForm datatable={datatable} />
        {/* <CardConfirm datatable={datatable} activeTab={activeTab} /> */}
      </div>
    </div>
  );
}

export default DetailGNetForm;
