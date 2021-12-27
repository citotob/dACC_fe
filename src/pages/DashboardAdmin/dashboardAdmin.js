import React, { useState, useEffect } from "react";
import CardSmall from "../../components/DashboardAdmin/CardSmall";
import CardSmallDarkBlue from "../../components/DashboardAdmin/CardSmallDarkBlue";

import { useLocation } from "react-router-dom";
// IMPORT COMPONENTS
import CardChart from "../../components/DashboardAdmin/CardMedium/CardChart";
import CardMap from "../../components/DashboardAdmin/CardMedium/CardMap";

// import styles from "../../assets/css/loginpages.module.css";

//import loader
import Skeleton from "react-loading-skeleton";

//import icons
import DiajukanMedBlue from "../../assets/icons/diajukan-medblue.svg";
import DiajukanDarkBlue from "../../assets/icons/diajukan-darkblue.svg";
import DisurveyMedBlue from "../../assets/icons/sudah-disurvey-medblue.svg";
import DisurveyDarkBlue from "../../assets/icons/sudah-disurvey-darkblue.svg";
import IsuMedBlue from "../../assets/icons/isu-medblue.svg";
import IsuDarkBlue from "../../assets/icons/isu-darkblue.svg";

import styles from "./style.module.css";

//import API
import API from "../../services";

const DashboardAdmin = ({ title }) => {
  let userId = window.localStorage.getItem("userid");
  // Page title
  const location = useLocation();
  const url = window.location.href;
  // console.log("url", url);
  const PageTitle = () => {
    return location.pathname
      .substr(location.pathname.lastIndexOf("/") + 1)
      .replace("-", " ")
      .replaceAll("%20", " ")
      .replaceAll("%24", "/");
    // .toUpperCase();
  };

  // States
  const [dashboardData, setdashboardData] = useState({});
  const [loadingCard, setloadingCard] = useState(false);

  const getDashboardCard = () => {
    setloadingCard(true);
    API.getDashboard()
      .then((res) => {
        if (res.status === 200) {
          // console.log("res dari get DASHBOARD : ", res.data.values);
          setdashboardData(res.data.values);
        } else {
          setdashboardData(null);
        }
        setloadingCard(false);
      })
      .catch((err) => {
        setloadingCard(false);
        setdashboardData(null);
        console.log(err);
      });
  };

  // fetch api
  useEffect(() => {
    getDashboardCard();
  }, []);

  // Data Dashboard
  const cardSmall = [
    {
      title: "Total Deposit",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.count_dp ?? ""}`
      ),
      icon: `${DiajukanMedBlue}`,
    },
    {
      title: "Total WD",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.count_wd ?? ""}`
      ),
      icon: `${DisurveyMedBlue}`,
    },
    {
      title: "Total WL",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.count_wl ?? ""}`
      ),
      icon: `${IsuMedBlue}`,
    },
  ];


  return (
    <div className='page-content px-4 overflow-auto'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-row align-items-center'>
          <div className='align-self-center'>
            <span className={`${styles.pageTitle} mr-4 `}>{PageTitle()}</span>
          </div>
        </div>
      </div>
      <div className={`mt-4 ${styles.container}`}>
        <ul className={`row ${styles.ul}`}>
          {cardSmall.map((e, i) => {
            return (
              <li
                key={i}
                className={`col-lg-4 col-m-12 col-s-12 mb-2 ${styles.li}`}
              >
                <CardSmall title={e.title} amount={e.amount} icon={e.icon} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardAdmin;
