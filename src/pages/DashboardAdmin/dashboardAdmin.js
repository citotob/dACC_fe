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
      title: "Total Lokasi Akses Internet Diajukan",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_ai ?? ""}`
      ),
      icon: `${DiajukanMedBlue}`,
    },
    {
      title: "Total Lokasi Akses Internet Sudah Disurvey",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_ai_surveyed ?? ""}`
      ),
      icon: `${DisurveyMedBlue}`,
    },
    {
      title: "Total Issue Temuan Dari Hasil Survey Akses Internet",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_ai_issue ?? ""}`
      ),
      icon: `${IsuMedBlue}`,
    },
  ];

  const cardSmallDarkBlue = [
    {
      title: "Total Lokasi BTS Diajukan",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_bts ?? ""}`
      ),
      icon: `${DiajukanDarkBlue}`,
    },
    {
      title: "Total Lokasi BTS Sudah Disurvey",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_bts_surveyed ?? ""}`
      ),
      icon: `${DisurveyDarkBlue}`,
    },
    {
      title: "Total Issue Temuan Dari Hasil Survey BTS",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${dashboardData?.penugasan_bts_issue ?? ""}`
      ),
      icon: `${IsuDarkBlue}`,
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
      <div className={styles.container}>
        <ul className={`row ${styles.ul}`}>
          {cardSmallDarkBlue.map((e, i) => {
            return (
              <li
                key={i}
                className={`col-lg-4 col-m-12 col-s-12 mb-2 ${styles.li}`}
              >
                <CardSmallDarkBlue
                  title={e.title}
                  amount={e.amount}
                  icon={e.icon}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className='row'>
        <CardChart />
        <CardMap />
      </div>
    </div>
  );
};

export default DashboardAdmin;
