import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeBreadcrumbItem } from "../../../store/breadcrumb/action";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

// Tabs functions
import classnames from "classnames";

// IMPORT CUSTOM STYLING
import style from "./style.module.css";
import "./style.css";

// IMPORT COMPONENT
import FilterCalendar from "../../../components/ModuleFilter/FilterDate/FilterDate";

//import API
import API from "../../../services";

// import loading from "../../../services/
import Skeleton from "react-loading-skeleton";

// Import export options
import ReactExport from "react-data-export";
import { CSVLink } from "react-csv";

function TableBootstrap() {
  // redux
  const dispatch = useDispatch();

  const org_id = window.localStorage.getItem("org");
  const userid = window.localStorage.getItem("userid");
  const role = window.localStorage.getItem("roleName");

  // helpers
  const [refresh, setrefresh] = useState(false);
  const moment = require("moment");
  const csvLink = useRef();

  // states
  // const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
  const [toggleButtonAI, settoggleButtonAI] = useState(`${style.togActiveBtn}`);
  const [toggleButtonBTS, settoggleButtonBTS] = useState(``);
  const [breadcrumbStatus, setbreadcrumbStatus] = useState("aksesinternet");
  const [activeTab, setActiveTab] = useState("AI");
  const [iconEyeToggle, seticonEyeToggle] = useState("bi-eye-slash");
  const [iconEyeTooltip, seticonEyeTooltip] = useState("Tampilkan Detail");

  //pagination states
  const [pageNumber, setpageNumber] = useState(1); // which page we are in
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNextStatus, setdisabledNextStatus] = useState(false);
  // const [disabledNextIssue, setdisabledNextIssue] = useState(false);
  const [disabledNextlog, setdisabledNextlog] = useState(false);

  //table data states
  const [tableDataStatus, settableDataStatus] = useState([]);
  // const [tableDataIssue, settableDataIssue] = useState([]);
  const [tableDataLog, settableDataLog] = useState([]);
  const [tableDataLogBTS, settableDataLogBTS] = useState([]); //khusus untuk role admin surveyor tab bts
  const [tableDataExport, settableDataExport] = useState([]);

  // state export
  let dataSetStatus = []; // untuk export hasil
  let dataSetIssue = []; // untuk export issue
  let dataSetLog = []; // untuk export log aja
  const [showExport, setshowExport] = useState(false);
  const [activeExportButton, setactiveExportButton] = useState("");
  const [excelButtonText, setexcelButtonText] = useState("excel");
  const [csvButtonText, setcsvButtonText] = useState("csv");

  // loading
  const [loading, setloading] = useState(false);
  const [detailStatusShown, setDetailStatusShown] = useState(false);

  // filter states
  const [filterShow, setfilterShow] = useState("d-none");
  const [searchShow, setsearchShow] = useState("d-none");
  const [filterCalendarShow, setFilterCalendarShow] = useState("d-none");
  const [searchInputShow, setsearchInputShow] = useState("");
  // const [roleList, setroleList] = useState([]); // untuk dropdown list tipe
  // const [orgList, setorgList] = useState([]); // untuk dropdown list instansi
  const [searchInput, setsearchInput] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [selectedField, setselectedField] = useState("");
  const [activeSearch, setactiveSearch] = useState("");
  const [selectStateField, setSelectStateField] = useState(true);

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("2");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }

  // toggles
  const tog_filter = () => {
    if (filterShow === "d-none") {
      setfilterShow("d-flex");
    } else {
      setfilterShow("d-none");
    }
    if (searchShow === "d-none") {
      setsearchShow("d-none");
    } else {
      setsearchShow("d-none");
    }
  };
  const tog_search = () => {
    if (searchShow === "d-none") {
      setsearchShow("d-flex");
    } else {
      setsearchShow("d-none");
    }
    if (filterShow === "d-none") {
      setfilterShow("d-none");
    } else {
      setfilterShow("d-none");
    }
  };

  const toggleModalCalendar = () => {
    setModalCalendar(!modalCalendar);
  };

  const handleSelectedDate = (date) => {
    let startDate = moment(date[0].startDate);
    let endDate = moment(date[0].endDate);
    setSelectedDate(
      `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
    );
    setselectedStartDate(moment(date[0].startDate).format("DD/MM/YY"));
    setselectedEndDate(moment(date[0].endDate).format("DD/MM/YY"));
    setTanggal(enumerateDaysBetweenDates(startDate, endDate));
  };
  // range date picker
  let initialEndDate = new Date();
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 6);
  initialEndDate = moment(initialEndDate);
  initialStartDate = moment(initialStartDate);
  const [modalCalendar, setModalCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${initialStartDate.format("DD/MM/YYYY")} - ${initialEndDate.format(
      "DD/MM/YYYY"
    )}`
  ); // untuk value input
  const [selectedStartDate, setselectedStartDate] = useState(
    `${initialStartDate.format("DD/MM/YY")}`
  );
  const [selectedEndDate, setselectedEndDate] = useState(
    `${initialEndDate.format("DD/MM/YY")}`
  );
  const [tanggal, setTanggal] = useState("");

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("DD-MM-YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  const getDataLog = () => {
    let formData = new FormData();
    formData.append("userId", userid);
    formData.append("row", usersPerPage);
    formData.append("page", pageNumber);
    if (activeTab === "AI") {
      API.getLogStaffSurveyorAI(formData)
        .then(async (res) => {
          if (res.status === 200) {
            // console.log('API Table Penugasan Staff Surveyor ', res.data.values);
            await sessionStorage.setItem(
              "tableDataLogAI",
              JSON.stringify(res.data.values)
            );
            await settableDataLog(
              JSON.parse(sessionStorage.getItem("tableDataLogAI"))
            );

            // if (res.data.values.length < usersPerPage) {
            //   setdisabledNext(true);
            // } else {
            //   setdisabledNext(false);
            // }
          } else {
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataLog(null);
          setloading(false);
          console.log(err);
        });
    } else if (activeTab === "BTS") {
      API.getLogStaffSurveyorBTS(formData)
        .then(async (res) => {
          if (res.status === 200) {
            // console.log('API Table Penugasan Staff Surveyor ', res.data.values);
            await sessionStorage.setItem(
              "tableDataLogBTS",
              JSON.stringify(res.data.values)
            );
            await settableDataLogBTS(
              JSON.parse(sessionStorage.getItem("tableDataLogBTS"))
            );

            // if (res.data.values.length < usersPerPage) {
            //   setdisabledNext(true);
            // } else {
            //   setdisabledNext(false);
            // }
          } else {
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataLog(null);
          setloading(false);
          console.log(err);
        });
    }
  };

  // console.log("Table data Log BTS", tableDataLogBTS);
  // fetch api untuk export
  const getDataStatusExport = (activeExportTab) => {
    let formData = new FormData();
    formData.append("surveyor", org_id);

    if (activeTab === "AI") {
      API.getSurveyorSubmitAI(formData)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            // console.log('EXPORT DATA FETCHED');
            setshowExport(true);
            if (activeExportTab === 1) {
              csvLink.current.link.click();
            }
            setTimeout(() => {
              setshowExport(false);
            }, 200);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else if (activeTab === "BTS") {
      API.getSurveyorSubmitBTS(formData)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            // console.log('EXPORT DATA FETCHED');
            setshowExport(true);
            if (activeExportTab === 1) {
              csvLink.current.link.click();
            }
            setTimeout(() => {
              setshowExport(false);
            }, 200);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const getDataLogExport = (activeExportTab) => {
    let formData = new FormData();
    formData.append("userid", userid);
    if (activeTab === "AI") {
      API.getLogStaffSurveyorAI(formData)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            // console.log('EXPORT DATA FETCHED');
            setshowExport(true);
            if (activeExportTab === 1) {
              csvLink.current.link.click();
            }
            setTimeout(() => {
              setshowExport(false);
            }, 200);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else if (activeTab === "BTS") {
      if (role === "admin") {
        API.getLogStaffSurveyorBTS(formData)
          .then((res) => {
            if (res.status === 200) {
              setexcelButtonText("excel");
              setcsvButtonText("csv");
              settableDataExport(res.data.values);
              // console.log('EXPORT DATA FETCHED');
              setshowExport(true);
              if (activeExportTab === 1) {
                csvLink.current.link.click();
              }
              setTimeout(() => {
                setshowExport(false);
              }, 200);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else if (role === "adminsurveyor") {
        API.getSurveyorLogBTS(formData)
          .then((res) => {
            if (res.status === 200) {
              setexcelButtonText("excel");
              setcsvButtonText("csv");
              settableDataExport(res.data.values);
              // console.log('EXPORT DATA FETCHED');
              setshowExport(true);
              if (activeExportTab === 1) {
                csvLink.current.link.click();
              }
              setTimeout(() => {
                setshowExport(false);
              }, 200);
            }
          })
          .catch((err) => {
            // console.log(err.response);
          });
      }
    }
  };

  // Handle filter search
  const handleSearchHasilAI = (searchData) => {
    let params = {
      surveyor: org_id,
      field: selectedField,
      value: searchData,
      row: usersPerPage,
      page: pageNumber,
    };

    setloading(true);
    if (activeTab === "AI") {
      API.searchHasilAISurveryor(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil AI > ', res);
            settableDataStatus(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextStatus(true);
            } else {
              setdisabledNextStatus(false);
            }
          } else {
            settableDataStatus(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search Hasil AI > ", err.response);
          settableDataStatus(null);
        });
    } else if (activeTab === "BTS") {
      API.searchHasilBTSSurveryor(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil BTS > ', res);
            settableDataStatus(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextStatus(true);
            } else {
              setdisabledNextStatus(false);
            }
          } else {
            settableDataStatus(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search Hasil BTS > ", err.response);
          settableDataStatus(null);
        });
    }
  };

  const handleSearchLogAI = (searchData) => {
    let params = {
      surveyor: org_id,
      field: selectedField,
      value: searchData,
      row: usersPerPage,
      page: pageNumber,
    };
    setloading(true);

    if (activeTab === "AI") {
      API.searchLogAISurveryor(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil Log AI > ', res);
            settableDataLog(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextlog(true);
            } else {
              setdisabledNextlog(false);
            }
          } else {
            settableDataLog([]);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          settableDataLog([]);
          console.error("API FAIL : Search Hasil Log AI > ", err.response);
        });
    } else if (activeTab === "BTS") {
      API.searchLogBTSSurveryor(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil Log BTS > ', res);
            settableDataLog(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextlog(true);
            } else {
              setdisabledNextlog(false);
            }
          } else {
            settableDataLog([]);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          settableDataLog([]);
          console.error("API FAIL : Search Hasil Log BTS > ", err.response);
        });
    }
  };

  useEffect(() => {
    dispatch(changeBreadcrumbItem("Akses Internet"));
  }, []);

  useEffect(() => {
    if (!selectedField) {
      // if (customActiveTab === '1') {
      //   getDataStatus();
      // } else
      if (customActiveTab === "2") {
        getDataLog();
      }
    } else {
      if (customActiveTab === "1") {
        if (activeSearch === "search") {
          handleSearchHasilAI(searchInput);
        } else if (activeSearch === "filter") {
          handleSearchHasilAI(selectedFilter);
        } else if (activeSearch === "tanggal") {
          handleSearchHasilAI(selectedDate);
        }
      } else if (customActiveTab === "2") {
        if (activeSearch === "search") {
          handleSearchLogAI(searchInput);
        } else if (activeSearch === "filter") {
          handleSearchLogAI(selectedFilter);
        } else if (activeSearch === "tanggal") {
          handleSearchLogAI(selectedDate);
        }
      }
    }

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [activeTab, customActiveTab, usersPerPage, pageNumber, refresh]);

  //Table Export Excel
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const ExcelExport = () => {
    if (customActiveTab === "1") {
      if (tableDataExport?.length > 0) {
        for (let i = 0; i < tableDataExport?.length; i++) {
          dataSetStatus.push({
            kode: tableDataExport[i]?.kode,
            instansi: tableDataExport[i]?.data[0]?.user?.organization?.name,
            desa: tableDataExport[i]?.lokasi?.desa?.name,
            kecamatan: tableDataExport[i]?.lokasi?.kecamatan?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            provinsi: tableDataExport[i]?.lokasi?.provinsi?.name,
            tanggal: moment(
              tableDataExport[i]?.data[0]?.status[0]?.tanggal_pembuatan
            ).format("DD MMMM YYYY"),
            status: tableDataExport[i]?.data[0]?.status?.slice(-1).pop().status,
          });
        }
      }
    } else if (customActiveTab === "2") {
      if (tableDataExport?.length > 0) {
        for (let i = 0; i < tableDataExport?.length; i++) {
          dataSetIssue.push({
            kode: tableDataExport[i]?.kode,
            instansi: tableDataExport[i]?.data[0]?.user?.organization?.name,
            desa: tableDataExport[i]?.lokasi?.desa?.name,
            kecamatan: tableDataExport[i]?.lokasi?.kecamatan?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            provinsi: tableDataLog[i]?.lokasi?.provinsi?.name,
            tanggal: moment(
              tableDataExport[i]?.data[0]?.status[0]?.tanggal_pembuatan
            ).format("DD MMMM YYYY"),
          });
        }
      }
    } else if (customActiveTab === "3") {
      if (tableDataExport?.length > 0) {
        for (let i = 0; i < tableDataExport?.length; i++) {
          dataSetLog.push({
            kode: tableDataExport[i]?.kode,
            desa: tableDataExport[i]?.lokasi?.desa?.name,
            kecamatan: tableDataExport[i]?.lokasi?.kecamatan?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            kabupaten: tableDataExport[i]?.lokasi?.kabupaten?.name,
            provinsi: tableDataExport[i]?.lokasi?.provinsi?.name,
            status: tableDataExport[i]?.status[0]?.status,
          });
        }
      }
    }

    return (
      <>
        {activeExportButton === 1 && (
          <CSVLink
            data={
              customActiveTab === "1"
                ? dataSetStatus
                : customActiveTab === "2"
                ? dataSetIssue
                : dataSetLog
            }
            filename='Hasil Survey.csv'
            className='hidden'
            ref={csvLink}
            target='_blank'
          />
        )}
        {activeExportButton === 2 && (
          <ExcelFile hideElement={true} filename='Hasil Survey'>
            <ExcelSheet
              data={
                customActiveTab === "1"
                  ? dataSetStatus
                  : customActiveTab === "2"
                  ? dataSetIssue
                  : dataSetLog
              }
              name='Employees'
            >
              <ExcelColumn label='Kode Survey' value='kode' />
              <ExcelColumn label='Instansi Surveyor' value='instansi' />
              <ExcelColumn label='Lokasi Survey (Desa)' value='desa' />
              <ExcelColumn
                label='Lokasi Survey (Kecamatan)'
                value='kecamatan'
              />
              <ExcelColumn
                label='Lokasi Survey (Kabupaten)'
                value='kabupaten'
              />
              <ExcelColumn label='Lokasi Survey (Provinsi)' value='provinsi' />
              <ExcelColumn label='Tanggal Hasil Survey Masuk' value='tanggal' />
              <ExcelColumn label='Status' value='status' />
            </ExcelSheet>
          </ExcelFile>
        )}
      </>
    );
  };

  // Table components
  // const tableStatus = () => {
  //   return (
  //     <div className="table-responsive">
  //       {tableDataStatus?.length > 0 ? (
  //         <table className="table">
  //           <thead>
  //             <tr>
  //               <th>No.</th>
  //               <th>Kode Survey</th>
  //               <th>Instansi Survey</th>
  //               <th>Lokasi Survey (Desa)</th>
  //               <th>Tanggal Hasil Survey Masuk</th>
  //               <th>Aksi</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {tableDataStatus && tableDataStatus?.length ? (
  //               tableDataStatus?.map((data, i) => {
  //                 return (
  //                   <tr key={i}>
  //                     <td>{i + 1}</td>
  //                     <td>{get(data?.data[0], 'kodeHasilSurvey', '-')}</td>
  //                     <td>
  //                       {get(data?.data[0], 'user.organization.name', '-')}
  //                     </td>
  //                     <td>{get(data?.lokasi, 'desa.name', '-')}</td>
  //                     <td>
  //                       {data?.data?.length !== 0
  //                         ? moment(
  //                             data?.data[0]?.status[0]?.tanggal_pembuatan
  //                           ).format('DD/MM/YYYY')
  //                         : '-'}
  //                     </td>
  //                     <td className={`${style.aksiButtonsWrapper}`}>
  //                       {/* <Link
  //                         to={{
  //                           pathname: `/staffsurveyor/hasil-survey/${data.data[0]._id}`,
  //                           state: { datatable: data, activeTab: activeTab },
  //                         }}
  //                       > */}
  //                       <button
  //                         type="button"
  //                         data-toggle="modal"
  //                         data-target="#myModal"
  //                         className={`${style.tugaskanButton}`}
  //                       >
  //                         Detail
  //                       </button>
  //                       {/* </Link> */}
  //                     </td>
  //                   </tr>
  //                 );
  //               })
  //             ) : (
  //               <tr>
  //                 {/* <td>Data Tidak Ditemukan</td> */}
  //                 <></>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       ) : (
  //         // <p>Data Tidak Ditemukan</p>
  //         <></>
  //       )}
  //     </div>
  //   );
  // };

  const tableLog = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kode Survey</th>
              <th>
                Status Hasil Survey{" "}
                <i
                  className={`bi ${iconEyeToggle} ml-2`}
                  onClick={() => {
                    setDetailStatusShown(!detailStatusShown);
                    if (iconEyeToggle === "bi-eye-slash") {
                      seticonEyeToggle("bi-eye");
                    } else if (iconEyeToggle === "bi-eye") {
                      seticonEyeToggle("bi-eye-slash");
                    }

                    if (iconEyeTooltip === "Tampilkan Detail") {
                      seticonEyeTooltip("Sembunyikan Detail");
                    } else {
                      seticonEyeTooltip("Tampilkan Detail");
                    }
                  }}
                  title={iconEyeTooltip}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {activeTab === "AI" &&
            JSON.parse(sessionStorage.getItem("tableDataLogAI")) ? (
              JSON.parse(sessionStorage.getItem("tableDataLogAI"))?.map(
                (e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.kode}</td>
                    <td>
                      {e.data[0].status.map((item, i) => {
                        if (detailStatusShown) {
                          return (
                            <p>
                              {" "}
                              {item?.status} (
                              {moment(item?.tanggal_pembuatan)?.format(
                                "DD/MM/YYYY"
                              ) ?? "-"}
                              )
                            </p>
                          );
                        } else {
                          if (i === e.data[0]?.status?.length - 1) {
                            return (
                              <p>
                                {" "}
                                {item?.status} (
                                {moment(item?.tanggal_pembuatan)?.format(
                                  "DD/MM/YYYY"
                                ) ?? "-"}
                                )
                              </p>
                            );
                          }
                        }
                      })}
                    </td>
                  </tr>
                )
              )
            ) : activeTab === "BTS" &&
              JSON.parse(sessionStorage.getItem("tableDataLogBTS")) ? (
              JSON.parse(sessionStorage.getItem("tableDataLogBTS"))?.map(
                (e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.kode}</td>
                    <td>
                      {e.data[0].status.map((item, i) => {
                        if (detailStatusShown) {
                          return (
                            <p>
                              {" "}
                              {item?.status} (
                              {moment(item?.date)?.format("DD/MM/YYYY") ?? "-"})
                            </p>
                          );
                        } else {
                          if (i === e.data[0]?.status?.length - 1) {
                            return (
                              <p>
                                {" "}
                                {item?.status} (
                                {moment(item?.date)?.format("DD/MM/YYYY") ??
                                  "-"}
                                )
                              </p>
                            );
                          }
                        }
                      })}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>Data Tidak Ditemukan</tr>
            )}
          </tbody>
        </table>
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
        {showExport ? <ExcelExport /> : ""}
        <Col className='col-12'>
          {/* <div className={`${alertVerifyStatus}`}>
            <Alert color='success'>Pengguna berhasil di verifikasi!</Alert>
          </div> */}

          {/* ====================== Toggle Button Akses Internet / BTS ===== */}
          <div className={`${style.toggleTableButtonWrapper}`}>
            <button
              className={`${toggleButtonAI}`}
              onClick={() => {
                settoggleButtonAI(`${style.togActiveBtn}`);
                settoggleButtonBTS("");
                setActiveTab("AI");
                dispatch(changeBreadcrumbItem("Akses Internet"));
                setpageNumber(1);
              }}
            >
              Akses Internet
            </button>
            <button
              className={`${toggleButtonBTS}`}
              onClick={() => {
                settoggleButtonAI("");
                settoggleButtonBTS(`${style.togActiveBtn}`);
                setActiveTab("BTS");
                dispatch(changeBreadcrumbItem("BTS"));
                setpageNumber(1);
              }}
            >
              BTS
            </button>
          </div>
          {/* ====================== Toggle Buttos Akses Internet / BTS ====================== */}
          {/* ====================== Tab Survey / Issue / Log ====================== */}
          <Card>
            <CardBody>
              <Nav tabs className='nav-tabs-custom'>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                      setbreadcrumbStatus("aksesinternet");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Log</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto `}>
                  {role === "staffsurveyor" ? (
                    <></>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          tog_search();
                          setselectedField("");
                        }}
                      >
                        Search
                      </button>
                      <button
                        onClick={() => {
                          tog_filter();
                          setselectedField("");
                        }}
                      >
                        Filter
                      </button>
                      <div className={`${style.tableSearchButtonWrapper}`}>
                        <button
                          className={`${style.tableSearchButton}`}
                          onClick={() => {
                            setactiveExportButton(1);
                            setcsvButtonText("downloading...");
                            if (customActiveTab === "1") {
                              getDataStatusExport(1);
                            } else if (customActiveTab === "3") {
                              getDataLogExport(1);
                            }
                          }}
                        >
                          {csvButtonText}
                        </button>
                        <button
                          className={`${style.tableSearchButton}`}
                          onClick={() => {
                            setactiveExportButton(2);
                            setexcelButtonText("downloading...");
                            if (customActiveTab === "1") {
                              getDataStatusExport(2);
                            } else if (customActiveTab === "3") {
                              getDataLogExport(2);
                            }
                          }}
                        >
                          {excelButtonText}
                        </button>
                      </div>
                    </>
                  )}
                  <div className={`d-flex ${style.selectDropdown}`}>
                    <select
                      style={{}}
                      className='ml-auto'
                      onChange={(e) => {
                        console.log(e.target.value);
                        setusersPerPage(parseInt(e.target.value, 10));
                        setpageNumber(1);
                      }}
                    >
                      <option
                        style={{ padding: "50px" }}
                        value='20'
                        defaultValue
                      >
                        20
                      </option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                    </select>
                  </div>
                </div>
              </Nav>
              {/* ==== filter dropdown  */}

              <div
                className={`${searchShow} flex-row my-2 justify-content-end w-100 ml-auto ${style.filterSearchWrapper}`}
              >
                <div
                  className={`${style.tableSearchBar}  d-flex flex-row align-items-center`}
                >
                  <div className={`${filterCalendarShow}`}>
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
                  </div>
                  <div className={`${searchInputShow}`}>
                    <i className='bi bi-search'></i>
                    <input
                      type='text'
                      name='search'
                      value={searchInput}
                      placeholder='Search...'
                      className={`${style.searchInput}`}
                      onChange={(e) => {
                        setsearchInput(e.target.value);
                        setactiveSearch("search");
                      }}
                    />
                  </div>

                  <select
                    name='field'
                    className={`${style.searchFieldDropDown}`}
                    value={selectedField}
                    onChange={(e) => {
                      setselectedField(e.target.value);
                      setactiveSearch("search");
                      setSelectStateField(false);
                      if (e.target.value === "tgl") {
                        setFilterCalendarShow("");
                        setsearchInputShow("d-none");
                        setactiveSearch("tanggal");
                      }
                      if (
                        e.target.value === "kode" ||
                        e.target.value === "lokasi"
                      ) {
                        setFilterCalendarShow("d-none");
                        setsearchInputShow("");
                        setactiveSearch("search");
                      }
                    }}
                  >
                    <option value=''>Pilih</option>
                    <option value='kode'>Kode Survey</option>
                    <option value='lokasi'>Lokasi Survey</option>
                    <option value='tgl'>Tanggal</option>
                  </select>
                </div>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    if (customActiveTab === "1") {
                      if (activeSearch === "tanggal") {
                        handleSearchHasilAI(selectedDate);
                      } else {
                        handleSearchHasilAI(searchInput);
                      }
                    } else if (customActiveTab === "2") {
                      if (activeSearch === "tanggal") {
                        handleSearchHasilAI(selectedDate);
                      } else {
                        handleSearchLogAI(searchInput);
                      }
                    }
                  }}
                >
                  Cari
                </button>
                <button
                  onClick={() => {
                    setselectedField("");
                    setselectedFilter("");
                    setsearchInput("");
                    setrefresh(!refresh);
                    setpageNumber(1);
                    setFilterCalendarShow("d-none");
                    setsearchInputShow("");
                  }}
                >
                  Reset
                </button>
              </div>

              <div
                className={`${filterShow} flex-row my-2 justify-content-end w-50 ml-auto ${style.filterSearchWrapper}`}
              >
                {/* ****** filter */}
                {/* --- dropdown select field  */}
                {customActiveTab !== "2" && (
                  <>
                    <select
                      className={`${style.filterSearchSelect} w-25 `}
                      name='field'
                      value={selectedField}
                      onChange={(e) => {
                        setselectedField(e.target.value);
                      }}
                    >
                      <option value=''>Pilih</option>
                      <option value='status'>Status</option>
                    </select>
                    {/* --- dropdown select value search input */}
                    <select
                      name='fieldvalue'
                      value={selectedFilter}
                      className={`${style.filterSearchSelect} w-75`}
                      onChange={(e) => {
                        setselectedFilter(e.target.value);
                        setactiveSearch("filter");
                      }}
                    >
                      <option value=''>Pilih Status</option>
                      <option value='Submitted'>Submitted</option>
                      <option value='Reviewed'>Reviewed</option>
                      {customActiveTab === "3" && (
                        <>
                          <option value='Done'>Done</option>
                          <option value='Finished'>Finished</option>
                        </>
                      )}
                    </select>
                    <button
                      className={`${style.searchButton}`}
                      onClick={() => {
                        if (customActiveTab === "1") {
                          handleSearchHasilAI(selectedFilter);
                        } else if (customActiveTab === "2") {
                          handleSearchLogAI(selectedFilter);
                        }
                      }}
                    >
                      Cari
                    </button>
                    <button
                      onClick={() => {
                        setselectedField("");
                        setselectedFilter("");
                        setsearchInput("");
                        setrefresh(!refresh);
                        setpageNumber(1);
                        setFilterCalendarShow("d-none");
                        setsearchInputShow("");
                      }}
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>

              <TabContent activeTab={customActiveTab}>
                <TabPane tabId='2' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loading ? (
                        <div
                          className='w-75 mx-auto'
                          style={{ fontSize: 20, lineHeight: 2.2 }}
                        >
                          <Skeleton height={20} count={5} />
                        </div>
                      ) : (
                        tableLog()
                      )}
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
          {/* ============ PAGINATION  */}
          {loading ? (
            <></>
          ) : (
            <div
              className={`d-flex flex-row mx-auto justify-content-between align-items-center ${style.paginationWrapper}`}
            >
              <button
                disabled={disabledPrev}
                className={`${style.paginationButton}`}
                onClick={() => {
                  if (pageNumber > 1) {
                    setpageNumber((prev) => prev - 1);
                  }
                }}
              >{`<`}</button>
              <p className={`mb-0`}>Halaman {pageNumber}</p>
              {customActiveTab === "1" && (
                <button
                  disabled={disabledNextStatus}
                  className={`${style.paginationButton}`}
                  onClick={() => {
                    if (tableDataStatus?.length >= usersPerPage) {
                      setpageNumber((prev) => prev + 1);
                    }
                  }}
                >{`>`}</button>
              )}
              {customActiveTab === "2" && (
                <button
                  disabled={disabledNextlog}
                  className={`${style.paginationButton}`}
                  onClick={() => {
                    if (tableDataLog?.length >= usersPerPage) {
                      setpageNumber((prev) => prev + 1);
                    }
                  }}
                >{`>`}</button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;