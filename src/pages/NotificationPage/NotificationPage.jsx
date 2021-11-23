import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import custom styling
import style from "./style.module.css";

// Import Components
import Table from "../../components/NotificationPage/TableBootstrap/TableBootstrap";

// Import API
import API from "../../services";

// IMPORT LIBRARY
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function NotificationPage() {
  const location = useLocation();

  let role = window.localStorage.getItem("roleName");

  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };
  //state
  const [notifList, setnotifList] = useState([]);

  const [pageNumber, setpageNumber] = useState(1);
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  let params = {
    user: role,
    page: pageNumber,
    row: usersPerPage,
  };

  const [loading, setloading] = useState(false);

  return (
    <div className={style.pageFont}>
      <div className='page-content px-4'>
        {/* ======================== HEADER ======================= */}
        <div className='d-flex flex-row justify-content-between'>
          <div className='d-flex flex-row align-items-center'>
            <div className='align-self-center'>
              <span className={`${style.pageTitle} mr-4 `}>
                Semua {PageTitle()}
              </span>
            </div>
          </div>
          <div>
            <Breadcrumbs title='Notifikasi' breadcrumbItem='Semua Notifikasi' />
          </div>
        </div>
        {/* ================= CONTENT ==================== */}
        <div className='pt-4 pb-1'>
          <Table notifList={notifList} />
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
