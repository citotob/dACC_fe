import React, { useState, useEffect, useCallback } from "react";
import CardSmall from "../../components/DashboardAdmin/CardSmall";
import CardSmallDarkBlue from "../../components/DashboardAdmin/CardSmallDarkBlue";

import { useLocation } from "react-router-dom";

//import loader
import Skeleton from "react-loading-skeleton";

//import icons
import DiajukanMedBlue from "../../assets/icons/diajukan-medblue.svg";
import DiajukanDarkBlue from "../../assets/icons/diajukan-darkblue.svg";
import DisurveyMedBlue from "../../assets/icons/sudah-disurvey-medblue.svg";
import DisurveyDarkBlue from "../../assets/icons/sudah-disurvey-darkblue.svg";
// import IsuMedBlue from "../../assets/icons/isu-medblue.svg";
// import IsuDarkBlue from "../../assets/icons/isu-darkblue.svg";

import style from "./style.module.css";

//import API
import API from "../../services";
import Localbase from "localbase";
let db = new Localbase("db");

const DashboardStaffSurveyor = ({ title }) => {
  const userid = window.localStorage.getItem("userid");
  // Page title
  const location = useLocation();
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
  const [permintaanAI, setPermintaanAI] = useState(null);
  const [permintaanBTS, setPermintaanBTS] = useState(null);
  const [dilakukanAI, setDilakukanAI] = useState(null);
  const [dilakukanBTS, setDilakukanBTS] = useState(null);

  // get API
  // const getDashboardCard = () => {
  //   setloadingCard(true);
  //   API.getDashboard()
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // console.log("res dari get DASHBOARD : ", res.data.values);
  //         setdashboardData(res.data.values);
  //       } else {
  //         setdashboardData(null);
  //       }
  //       setloadingCard(false);
  //     })
  //     .catch((err) => {
  //       setloadingCard(false);
  //       setdashboardData(null);
  //       console.log(err);
  //     });
  // };

  const getPermintaanAI = useCallback(() => {
    setloadingCard(true);
    let params = {
      field: "assignto1",
      jenis: "ai",
      value: userid,
      status: "on progress",
    };
    API.getPenugasanTable(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("permintaan ai ", res?.data?.message?.split(" ")[0]);
          setPermintaanAI(res?.data?.message?.split(" ")[0]);
          sessionStorage.setItem(
            "permintaanAI",
            res?.data?.message?.split(" ")[0]
          );
        } else {
          setPermintaanAI(null);
        }
        setloadingCard(false);
      })
      .catch((err) => {
        setloadingCard(false);
        console.log(err);
      });
  }, []);

  const getPermintaanBTS = useCallback(() => {
    setloadingCard(true);
    let params = {
      field: "assignto1",
      jenis: "bts",
      value: userid,
      status: "on progress",
    };
    API.getPenugasanTable(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("permintaan bts ", res?.data?.message?.split(" ")[0]);
          setPermintaanBTS(res?.data?.message?.split(" ")[0]);
          sessionStorage.setItem(
            "permintaanBTS",
            res?.data?.message?.split(" ")[0]
          );
        } else {
          setPermintaanBTS(null);
        }
        setloadingCard(false);
      })
      .catch((err) => {
        setloadingCard(false);
        console.log(err);
      });
  }, []);

  const getDilakukanAI = useCallback(() => {
    setloadingCard(true);
    let formData = new FormData();
    formData.append("userId", userid);
    API.getsurveybyuserai(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("dilakukan ai ", res?.data?.message?.split(" ")[0]);
          setDilakukanAI(res?.data?.message?.split(" ")[0]);
          sessionStorage.setItem(
            "dilakukanAI",
            res?.data?.message?.split(" ")[0]
          );
        } else {
          setDilakukanAI(null);
        }
        setloadingCard(false);
      })
      .catch((err) => {
        setloadingCard(false);
        console.log(err);
      });
  }, []);

  const getDilakukanBTS = useCallback(() => {
    setloadingCard(true);
    let formData = new FormData();
    formData.append("userId", userid);
    API.getsurveybyuserbts(formData)
      .then((res) => {
        if (res.status === 200) {
          console.log("dilakukan bts ", res?.data?.message?.split(" ")[0]);
          setDilakukanBTS(res?.data?.message?.split(" ")[0]);
          sessionStorage.setItem(
            "dilakukanBTS",
            res?.data?.message?.split(" ")[0]
          );
        } else {
          setDilakukanBTS(null);
        }
        setloadingCard(false);
      })
      .catch((err) => {
        setloadingCard(false);
        console.log(err);
      });
  }, []);

  // fetch api
  useEffect(() => {
    // getDashboardCard();
    getPermintaanAI();
    getPermintaanBTS();
    getDilakukanAI();
    getDilakukanBTS();
  }, [getPermintaanAI, getPermintaanBTS, getDilakukanAI, getDilakukanBTS]);

  // Data Dashboard
  const cardSmall = [
    {
      title: "Permintaan Survey Masuk (AI)",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${sessionStorage.getItem("permintaanAI") ?? ""}`
      ),
      icon: `${DiajukanMedBlue}`,
    },
    {
      title: "Survey Sudah Dilakukan (AI)",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${sessionStorage.getItem("dilakukanAI") ?? ""}`
      ),
      icon: `${DisurveyMedBlue}`,
    },
  ];

  const cardSmallDarkBlue = [
    {
      title: "Permintaan Survey Masuk (BTS)",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${sessionStorage.getItem("permintaanBTS") ?? ""}`
      ),
      icon: `${DiajukanDarkBlue}`,
    },
    {
      title: "Survey Sudah Dilakukan (BTS)",
      amount: loadingCard ? (
        <Skeleton width={100} />
      ) : (
        `${sessionStorage.getItem("dilakukanBTS") ?? ""}`
      ),
      icon: `${DisurveyDarkBlue}`,
    },
  ];

  return (
    <div className='page-content px-4'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-row align-items-center'>
          <div className='align-self-center'>
            <span className={`${style.pageTitle} mr-4 `}>{PageTitle()}</span>
          </div>
        </div>
      </div>
      <div className={`mt-4 ${style.container}`}>
        {!loadingCard ? (
          <ul className={`row ${style.ul}`}>
            {cardSmall.map((e, i) => {
              return (
                <li
                  key={i}
                  className={`col-lg-6 col-m-6 col-s-12 mb-2 ${style.li}`}
                >
                  <CardSmall title={e.title} amount={e.amount} icon={e.icon} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>...</p>
        )}
      </div>
      <div className={style.container}>
        <ul className={`row ${style.ul}`}>
          {cardSmallDarkBlue.map((e, i) => {
            return (
              <li
                key={i}
                className={`col-lg-6 col-m-6 col-s-12 mb-2 ${style.li}`}
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
    </div>
  );
};

export default DashboardStaffSurveyor;
