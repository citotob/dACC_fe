import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";

// IMPORT CUSTOM STYLING
import style from "./style.module.css";
import "./style.css";

// import api
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// import components
import FilterCalendar from "../../../components/ModuleFilter/FilterDate/FilterDate";

function TableBootstrap() {
  // Helper
  const moment = require("moment");
  let today = new Date();
  let lastThreeDays = moment(today).subtract(3, "days")._d;
  let role = window.localStorage.getItem("roleName");
  let username = window.localStorage.getItem("username");
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // API states
  const [notifList, setnotifList] = useState([]);
  const [tableDataNotif, setTableDataNotif] = useState(notifList);

  // filter states
  const [searchInput, setsearchInput] = useState("");
  const [selectedField, setselectedField] = useState("tanggal");
  const [selectStateField, setSelectStateField] = useState(true);

  // range date picker
  let initialEndDate = new Date();
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 6);
  initialEndDate = moment(initialEndDate);
  initialStartDate = moment(initialStartDate);
  const [startDate, setStartDate] = useState(null); // Tanggal SLA Penyelesaian
  const [endDate, setEndDate] = useState(null); // Tanggal SLA Penyelesaian
  const [modalCalendar, setModalCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Filter Tanggal");
  // const [selectedDate, setSelectedDate] = useState(
  //   `${initialStartDate.format("DD-MM-YYYY")} - ${initialEndDate.format(
  //     "DD-MM-YYYY"
  //   )}`
  // );

  // pagination states
  const [pageNumber, setpageNumber] = useState(1);
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  // toggles
  const toggleModalCalendar = () => {
    setModalCalendar(!modalCalendar);
  };

  // API fetch
  const getNotifPerPage = () => {
    let params = {
      user: username,
      page: pageNumber,
      row: usersPerPage,
    };

    setloading(true);
    API.getNotifPerPage(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("API SUCCESS Fetch Notification Table :  > ", res);
          setnotifList(res.data.values);
          if (res.data.values.length < usersPerPage) {
            setdisabledNext(true);
          } else {
            setdisabledNext(false);
          }
        }
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (selectedDate === "Filter Tanggal") {
      getNotifPerPage();
    } else {
      handleSearchNotif();
    }

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [pageNumber, usersPerPage, refresh]);

  const handleSelectedDate = (date) => {
    let startDate = moment(date[0].startDate);
    let endDate = moment(date[0].endDate);
    setSelectedDate(
      `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
    );
    setsearchInput(
      `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
    );
  };

  const handleSearchNotif = () => {
    let params = {
      user: "admin",
      field: selectedField,
      value: selectedDate,
      row: usersPerPage,
      page: pageNumber,
    };

    API.searchNotif(params)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          console.log("API SUCCESS Filter Date :  > ", res);
          setnotifList(res.data.values);
        }
      })
      .catch((err) => {
        console.error("API FAIL Filter Date :  > ", err.response);
      });
  };
  // Table components
  const table = () => {
    return (
      <div className='table-responsive'>
        {notifList?.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th>Pesan</th>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {notifList?.map((data, i) => {
                // console.log(data.title.toLowerCase().includes("survey"));
                return (
                  <tr key={i}>
                    <td>
                      {data?.message}
                      <span className='badge badge-pill badge-danger ml-2 align-top'>
                        {moment(data?.tanggal)._d > lastThreeDays ? "New" : ""}
                      </span>
                    </td>
                    <td>{moment(data?.tanggal).format("DD/MM/YYYY")}</td>
                    <td>{data?.title}</td>
                    {role === "admin" && (
                      <td className={`${style.aksiButtonsWrapper}`}>
                        {data.title.toLowerCase().includes("penugasan") && (
                          <Link to='/admin/penugasan'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        )}
                        {data.title.toLowerCase().includes("pengguna") ||
                          (data.title.toLowerCase().includes("regis") && (
                            <Link to='/admin/data-pengguna'>
                              <button
                                type='button'
                                data-toggle='modal'
                                data-target='#myModal'
                                className={`${style.tugaskanButton}`}
                              >
                                Lihat
                              </button>
                            </Link>
                          ))}
                        {data.title.toLowerCase().includes("survey") && (
                          <Link to='/admin/hasil-survey'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        )}
                      </td>
                    )}
                    {role === "adminsurveyor" && (
                      <td className={`${style.aksiButtonsWrapper}`}>
                        {data.title.toLowerCase().includes("tugaskan") ? (
                          <Link to='/adminsurveyor/penugasan'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {data.title.toLowerCase().includes("hasil") ||
                        data.title.toLowerCase().includes("issue") ? (
                          <Link to='/adminsurveyor/hasil-survey'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {data.title.toLowerCase().includes("setujui") ? (
                          <Link to='/adminsurveyor/hasil-survey'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </td>
                    )}
                    {role === "staffsurveyor" && (
                      <td className={`${style.aksiButtonsWrapper}`}>
                        {data.title.toLowerCase().includes("tugaskan") ? (
                          <Link to='/staffsurveyor/penugasan'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {data.title.toLowerCase().includes("hasil") ||
                        data.title.toLowerCase().includes("issue") ? (
                          <Link to='/staffsurveyor/hasil-survey'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {data.title.toLowerCase().includes("setujui") ? (
                          <Link to='/staffsurveyor/hasil-survey'>
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Lihat
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Data Tidak Ditemukan</p>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <FilterCalendar
        modalCalendar={modalCalendar}
        toggleModalCalendar={toggleModalCalendar}
        selectedDate={handleSelectedDate}
      />
      <Row>
        <Col className='col-12'>
          <Card>
            <CardBody>
              <div
                className={`d-flex flex-row my-2 mb-3 justify-content-end w-50 ml-auto ${style.filterSearchWrapper}`}
              >
                <div className='d-flex flex-row justify-content-center align-items-center'>
                  <input
                    type='text'
                    onClick={toggleModalCalendar}
                    value={selectedDate}
                    style={{ width: "200px" }}
                    onChange={() => console.log("Date selected")}
                  />
                  <span
                    className='mdi mdi-18px mdi-calendar-range mx-2'
                    onClick={toggleModalCalendar}
                  />
                </div>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    handleSearchNotif();
                  }}
                >
                  Cari
                </button>
                <button
                  onClick={() => {
                    setselectedField(null);
                    setsearchInput("");
                    setSelectedDate("Filter Tanggal");
                    setRefresh(!refresh);
                  }}
                >
                  Reset
                </button>
              </div>
              {loading ? (
                <div
                  className='d-flex justify-content-center align-items-center my-5'
                  style={{ fontSize: 20, lineHeight: 2.2 }}
                >
                  <SkeletonTheme color='#406D96' highlightColor='#E3EDF0'>
                    <p>
                      <Skeleton circle={true} height={50} width={50} />
                    </p>
                  </SkeletonTheme>
                </div>
              ) : (
                <Row>
                  <Col sm='12'>{table()}</Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* ============ PAGINATION  */}
      {loading ? (
        <></>
      ) : (
        <div
          className={`d-flex flex-row mx-auto justify-content-center align-items-center ${style.paginationWrapper}`}
        >
          <button
            disabled={disabledPrev}
            type='button'
            className={`${style.paginationButton}`}
            // disabled={page === 1}
            onClick={() => {
              if (pageNumber > 1) {
                setpageNumber((prev) => prev - 1);
              }
            }}
          >{`<`}</button>
          <span className='mx-4 font-weight-bold'>Halaman {pageNumber}</span>
          <button
            disabled={disabledNext}
            type='button'
            className={`${style.paginationButton}`}
            disabled={notifList.length !== 20}
            onClick={() => {
              if (notifList?.length === usersPerPage) {
                setpageNumber((prev) => prev + 1);
              }
            }}
          >{`>`}</button>
        </div>
      )}
    </React.Fragment>
  );
}

export default TableBootstrap;
