import React from "react";

import { useLocation, useParams } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// IMPORT STYLE
import style from "./style.module.scss";

// IMPORT CARDS
import CardDetail from "../../components/DetailIssue/CardDetail";
import CardInfo from "../../components/DetailIssue/CardInfo";
import CardTabs from "../../components/DetailIssue/CardTabs";
import CardConfirm from "../../components/DetailIssue/CardConfirm";

function DetailIssue(props) {
  // console.log("detailsurvey", props)
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
              <span className={`${style.pageTitle} mr-4`}>
                Manajemen Hasil Survey
              </span>
              {/* USE IF SOMETHING TO THE RIGHT OF THE PAGE IS NEEDED */}
              {/* <button
                className={`${style.addDataButton}`}
                type='button'
                onClick={() => {
                  tog_AddData();
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                <i className='bi bi-plus-circle'></i>
                <span>Tambah Data</span>
              </button> */}
            </div>
          </div>
          <div>
            {/* FIX BREADCRUMB TO SHOW MORE THAN 1 LAYER BELOW */}
            <Breadcrumbs
              title='Manajemen Hasil Survey'
              titleLink='/admin/hasil-survey'
            />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <CardDetail datatable={datatable} />
        <CardInfo datatable={datatable} />
        <CardConfirm datatable={datatable} activeTab={activeTab} />
      </div>
    </div>
  );
}

export default DetailIssue;
