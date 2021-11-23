import React from "react";
import { useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/Gnettrack/TableBootstrap/TableBootstrap";

function Gnettrack() {
  const location = useLocation();
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
  };

  return (
    <div className={style.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>G-NetTrack</span>
            </div>
          </div>
          <div>
            <Breadcrumbs title='G-NetTrack' breadcrumbItem='G-NetTrack' />
          </div>
        </div>
        {/* ======================== CONTENT ======================= */}
        <div className='py-4'>
          {/* <p>Ini page gnet</p> */}
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Gnettrack;
