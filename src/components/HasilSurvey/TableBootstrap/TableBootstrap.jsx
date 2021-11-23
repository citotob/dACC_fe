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
  Modal,
  Alert,
} from "reactstrap";

import { Link } from "react-router-dom";

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

  // helpers
  const [refresh, setrefresh] = useState(false);
  const moment = require("moment");
  const csvLink = useRef();

  // states
  const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
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
  const [disabledNextIssue, setdisabledNextIssue] = useState(false);
  const [disabledNextlog, setdisabledNextlog] = useState(false);

  //table data states
  const [tableDataStatus, settableDataStatus] = useState([]);
  const [tableDataIssue, settableDataIssue] = useState([]);
  const [tableDataLog, settableDataLog] = useState([]);
  const [tableDataExport, settableDataExport] = useState([]);

  // state export
  let dataSetStatus = []; // untuk export hasil dan issue
  let dataSetLog = []; // untuk export log aja
  const [showExport, setshowExport] = useState(false);
  const [activeExportButton, setactiveExportButton] = useState("");
  const [excelButtonText, setexcelButtonText] = useState("excel");
  const [csvButtonText, setcsvButtonText] = useState("csv");

  // filter states
  const [filterShow, setfilterShow] = useState("d-none");
  const [searchShow, setsearchShow] = useState("d-none");
  const [filterCalendarShow, setFilterCalendarShow] = useState("d-none");
  const [searchInputShow, setsearchInputShow] = useState("");
  const [roleList, setroleList] = useState([]); // untuk dropdown list tipe
  const [orgList, setorgList] = useState([]); // untuk dropdown list instansi
  const [searchInput, setsearchInput] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [selectedField, setselectedField] = useState("");
  const [activeSearch, setactiveSearch] = useState("");

  // loading
  const [loading, setloading] = useState(false);
  const [detailStatusShown, setDetailStatusShown] = useState(false);

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

  // Tabs functions (verifikasi, aktif, ditolak)
  const [customActiveTab, setcustomActiveTab] = useState("1");
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

  //toggle date range picker calendar

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

  // initial data for dropdown role and organization list
  const getInitData = () => {
    const params = {
      surveyor: "all",
      jenis: "ai/bts",
    };
    API.getSurveyor(params)
      .then((res) => {
        const organizationData = res?.data?.values ?? "";
        if (res.status === 200) {
          setorgList(organizationData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch API
  const getDataStatus = () => {
    let formData = new FormData();
    formData.append("status", "Done");
    formData.append("row", usersPerPage);
    formData.append("page", pageNumber);

    if (activeTab === "AI") {
      setloading(true);
      API.getSurveyStatusAI(formData)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API table survey status AI :", res.data);
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
          settableDataStatus(null);
          setloading(false);
          console.log(err.response);
        });
    } else if (activeTab === "BTS") {
      setloading(true);
      API.getHasilBTS(pageNumber, usersPerPage)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API table survey status BTS :", res.data);
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
          settableDataStatus(null);
          settableDataStatus(false);
          console.log(err.response);
        });
    }
  };

  const getDataIssue = () => {
    if (activeTab === "AI") {
      const params = { jenis: "ai", row: usersPerPage, page: pageNumber };
      setloading(true);
      API.getSurveyIssue(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API table survey issue AI :", res.data);
            settableDataIssue(res.data.values);

            if (res.data.values.length < usersPerPage) {
              setdisabledNextIssue(true);
            } else {
              setdisabledNextIssue(false);
            }
          } else {
            settableDataIssue(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataIssue(null);
          setloading(false);
          console.log(err.response);
        });
    } else if (activeTab === "BTS") {
      const params = { jenis: "bts", row: usersPerPage, page: pageNumber };
      setloading(true);
      API.getSurveyIssue(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API table survey issue BTS :", res.data);
            settableDataIssue(res.data.values);

            if (res.data.values.length < usersPerPage) {
              setdisabledNextIssue(true);
            } else {
              setdisabledNextIssue(false);
            }
          } else {
            settableDataIssue(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataIssue(null);
          setloading(false);
          console.log(err.response);
        });
    }
  };

  const getDataLog = () => {
    let formData = new FormData();
    formData.append("row", usersPerPage);
    formData.append("page", pageNumber);

    if (activeTab === "AI") {
      setloading(true);
      API.getSurveyLogAI(formData)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API table survey Log AI :", res.data);
            settableDataLog(res.data.values);

            if (res.data.values.length < usersPerPage) {
              setdisabledNextlog(true);
            } else {
              setdisabledNextlog(false);
            }
          } else {
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataLog(null);
          setloading(false);
          console.log(err.response);
        });
    } else if (activeTab === "BTS") {
      setloading(true);
      API.getSurveyLogBTS(pageNumber, usersPerPage)
        .then((res) => {
          if (res.status === 200) {
            console.log("API TABLE Log BTS :", res.data);
            settableDataLog(res.data.values);

            if (res.data.values.length < usersPerPage) {
              setdisabledNextlog(true);
            } else {
              setdisabledNextlog(false);
            }
          } else {
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableDataLog(null);
          settableDataLog(false);
          console.log(err.response);
        });
    }
  };

  // fetch api untuk export
  const getDataStatusExport = (activeExportTab) => {
    let formData = new FormData();
    formData.append("status", "Done");

    if (activeTab === "AI") {
      API.getSurveyStatusAI(formData)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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
          console.log(err);
        });
    } else if (activeTab === "BTS") {
      API.getSurveyStatusBTS(formData)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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

  const getDataIssueExport = (activeExportTab) => {
    if (activeTab === "AI") {
      const params = { jenis: "ai" };
      API.getSurveyIssue(params)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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
      const params = { jenis: "bts" };
      API.getSurveyIssue(params)
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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
    if (activeTab === "AI") {
      API.getSurveyLogAI()
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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
      API.getSurveyLogBTS()
        .then((res) => {
          if (res.status === 200) {
            setexcelButtonText("excel");
            setcsvButtonText("csv");
            settableDataExport(res.data.values);
            console.log("EXPORT DATA FETCHED");
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

  // Handle filter search
  const handleSearchHasil = (searchData) => {
    let params = {
      field: selectedField,
      value: searchData,
      row: usersPerPage,
      page: pageNumber,
    };

    setloading(true);

    if (activeTab === "AI") {
      API.searchHasilAI(params)
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
      API.searchHasilBTS(params)
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
    } else {
      setloading(false);
      console.error("API SEARCH HASIL FAIL ");
      settableDataStatus(null);
    }
  };

  const handleSearchIssue = (searchData) => {
    let params = {
      field: selectedField,
      value: searchData,
      row: usersPerPage,
      page: pageNumber,
    };
    setloading(true);
    if (activeTab === "AI") {
      API.searchIssueAI(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil Issue AI > ', res);
            settableDataIssue(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextIssue(true);
            } else {
              setdisabledNextIssue(false);
            }
          } else {
            settableDataIssue(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search Hasil Issue AI > ", err);
          settableDataIssue(null);
        });
    } else if (activeTab === "BTS") {
      API.searchIssueBTS(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil Issue BTS > ', res);
            settableDataIssue(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextIssue(true);
            } else {
              setdisabledNextIssue(false);
            }
          } else {
            settableDataIssue(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search Hasil Issue BTS > ", err);
          settableDataIssue(null);
        });
    } else {
      setloading(false);
      console.error("API SEARCH ISSUE FAIL > ");
      settableDataIssue(null);
    }
  };

  const handleSearchLog = (searchData) => {
    let params = {
      field: selectedField,
      value: searchData,
      row: usersPerPage,
      page: pageNumber,
    };
    setloading(true);
    if (activeTab === "AI") {
      API.searchLogAI(params)
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
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search Hasil Log AI > ", err);
          settableDataLog(null);
        });
    } else if (activeTab === "BTS") {
      API.searchLogBTS(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log('API SUCCESS : Search Hasil BTS > ', res);
            settableDataLog(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNextStatus(true);
            } else {
              setdisabledNextStatus(false);
            }
          } else {
            settableDataLog(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL : Search LOG BTS > ", err.response);
          settableDataLog(null);
        });
    } else {
      setloading(false);
      console.error("API SEARCH LOG FAIL > ");
      settableDataLog(null);
    }
  };

  // FETCH API FOR ADMIN SURVEYOR ROLES

  useEffect(() => {
    dispatch(changeBreadcrumbItem("Akses Internet"));
  }, []);

  // get data table
  useEffect(() => {
    getInitData();

    if (!selectedField) {
      if (customActiveTab === "1") {
        getDataStatus();
      } else if (customActiveTab === "2") {
        getDataIssue();
      } else if (customActiveTab === "3") {
        getDataLog();
      }
    } else {
      if (customActiveTab === "1") {
        if (activeSearch === "search") {
          handleSearchHasil(searchInput);
        } else if (activeSearch === "filter") {
          handleSearchHasil(selectedFilter);
        } else if (activeSearch === "tanggal") {
          handleSearchHasil(selectedDate);
        }
      } else if (customActiveTab === "2") {
        if (activeSearch === "search") {
          handleSearchIssue(searchInput);
        } else if (activeSearch === "filter") {
          handleSearchIssue(selectedFilter);
        } else if (activeSearch === "tanggal") {
          handleSearchIssue(selectedDate);
        }
      } else if (customActiveTab === "3") {
        if (activeSearch === "search") {
          handleSearchLog(searchInput);
        } else if (activeSearch === "filter") {
          handleSearchLog(selectedFilter);
        } else if (activeSearch === "tanggal") {
          handleSearchLog(selectedDate);
        }
      }
    }

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [activeTab, customActiveTab, usersPerPage, pageNumber, refresh]);

  // modal states
  const [modalTugaskanOpen, setmodalTugaskanOpen] = useState(false);

  // modal functions
  function tog_tugaskan() {
    setmodalTugaskanOpen(!modalTugaskanOpen);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  // Tabs functions (verifikasi, aktif, ditolak)

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
          });
        }
      }
    } else if (customActiveTab === "2") {
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
            data={customActiveTab !== "3" ? dataSetStatus : dataSetLog}
            filename='Hasil Survey.csv'
            className='hidden'
            ref={csvLink}
            target='_blank'
          />
        )}
        {activeExportButton === 2 && (
          <ExcelFile hideElement={true} filename='Hasil Survey'>
            <ExcelSheet
              data={customActiveTab !== "3" ? dataSetStatus : dataSetLog}
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
              {customActiveTab !== "3" ? (
                <ExcelColumn
                  label='Tanggal Hasil Survey Masuk'
                  value='tanggal'
                />
              ) : (
                <ExcelColumn label='Status' value='status' />
              )}
            </ExcelSheet>
          </ExcelFile>
        )}
      </>
    );
  };

  // Table components
  const tableStatus = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kode Survey</th>
              <th>Instansi Surveyor</th>
              <th>Lokasi Survey (Desa)</th>
              <th>Lokasi Survey (Kecamatan)</th>
              <th>Lokasi Survey (Kabupaten)</th>
              <th>Lokasi Survey (Provinsi)</th>
              <th>Tanggal Hasil Survey Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableDataStatus && tableDataStatus.length ? (
              tableDataStatus?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.data[0]?.kodeHasilSurvey
                        : ""}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.data[0]?.user?.organization?.name
                        : ""}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.lokasi?.desa?.name
                        : "-"}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.lokasi?.kecamatan?.name
                        : "-"}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.lokasi?.kabupaten?.name
                        : "-"}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? data?.lokasi?.provinsi?.name
                        : "-"}
                    </td>
                    <td>
                      {data?.data?.length !== 0
                        ? moment(
                            data?.data[0]?.status[0]?.tanggal_pembuatan
                          ).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td className={`${style.aksiButtonsWrapper}`}>
                      {/* {console.log("data dalem tabel survey: ", data.data[0]._id)} */}
                      {activeTab === "AI" ? (
                        <Link
                          to={{
                            pathname: `/admin/hasil-survey/${data?.data[0]?._id}`,
                            state: { datatable: data, activeTab: activeTab },
                          }}
                        >
                          <button
                            type='button'
                            // onClick={() => {
                            //   tog_tugaskan();
                            // }}
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Detail
                          </button>
                        </Link>
                      ) : (
                        <Link
                          to={{
                            pathname: `/admin/hasil-survey/BTS/${data?.data[0]?._id}`,
                            state: { datatable: data, activeTab: activeTab },
                          }}
                        >
                          <button
                            type='button'
                            // onClick={() => {
                            //   tog_tugaskan();
                            // }}
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Detail
                          </button>
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Data Tidak Ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const tableIssue = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kode Survey</th>
              <th>Instansi Surveyor</th>
              <th>Lokasi Survey (Desa)</th>
              <th>Lokasi Survey (Kecamatan)</th>
              <th>Lokasi Survey (Kabupaten)</th>
              <th>Lokasi Survey (Provinsi)</th>
              <th>Tanggal Hasil Survey Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableDataIssue?.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {data?.data?.length !== 0
                      ? data?.data[0]?.kodeHasilSurvey
                      : ""}
                  </td>
                  <td>
                    {data?.data?.length !== 0
                      ? data?.data[0]?.user?.organization?.name
                      : ""}
                  </td>
                  <td>
                    {data?.data?.length !== 0 ? data?.lokasi?.desa?.name : "-"}
                  </td>
                  <td>
                    {data?.data?.length !== 0
                      ? data?.lokasi?.kecamatan?.name
                      : "-"}
                  </td>
                  <td>
                    {data?.data?.length !== 0
                      ? data?.lokasi?.kabupaten?.name
                      : "-"}
                  </td>
                  <td>
                    {data?.data?.length !== 0
                      ? data?.lokasi?.provinsi?.name
                      : "-"}
                  </td>
                  <td>
                    {data?.data?.length !== 0
                      ? moment(
                          data?.data[0]?.status[0]?.tanggal_pembuatan
                        ).format("DD/MM/YYYY")
                      : ""}
                  </td>
                  <td className={`${style.aksiButtonsWrapper}`}>
                    <Link
                      to={{
                        pathname: `/admin/hasil-survey/issue/${data?.data[0]?._id}`,
                        state: { datatable: data, activeTab: activeTab },
                      }}
                    >
                      <button
                        type='button'
                        // onClick={() => {
                        //   tog_tugaskan();
                        // }}
                        data-toggle='modal'
                        data-target='#myModal'
                        className={`${style.tugaskanButton}`}
                      >
                        Detail Issue
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const tableLog = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kode Survey</th>
              <th>Lokasi Survey (Desa)</th>
              <th>Lokasi Survey (Kecamatan)</th>
              <th>Lokasi Survey (Kabupaten)</th>
              <th>Lokasi Survey (Provinsi)</th>
              {/* <th>Tanggal</th> */}
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
            {tableDataLog && tableDataLog.length ? (
              tableDataLog?.map((data, i) => {
                console.log("hasil mapping", data);
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data?.kode ?? ""}</td>
                    <td>{data?.lokasi?.desa?.name ?? "-"}</td>
                    <td>{data?.lokasi?.kecamatan?.name ?? "-"}</td>
                    <td>{data?.lokasi?.kabupaten?.name ?? "-"}</td>
                    <td>{data?.lokasi?.provinsi?.name ?? "-"}</td>
                    <td>
                      {data?.status?.map ? (
                        data?.status[0][0] ? (
                          data?.status[0]?.map((item, i) => {
                            if (detailStatusShown) {
                              return (
                                <p key={i}>
                                  {item?.status} (
                                  {moment(item?.tanggal_pembuatan)?.format(
                                    "DD/MM/YYYY"
                                  ) ?? "-"}
                                  )
                                </p>
                              );
                            } else {
                              if (i === data.status.length - 1) {
                                return (
                                  <p key={i}>
                                    {item?.status} (
                                    {moment(item?.tanggal_pembuatan)?.format(
                                      "DD/MM/YYYY"
                                    ) ?? "-"}
                                    )
                                  </p>
                                );
                              }
                            }
                          })
                        ) : (
                          data?.status?.map((item, i) => {
                            if (detailStatusShown) {
                              return (
                                <p key={i}>
                                  {item?.status} (
                                  {moment(item?.tanggal_pembuatan)?.format(
                                    "DD/MM/YYYY"
                                  ) ?? "-"}
                                  )
                                </p>
                              );
                            } else {
                              if (i === data.status.length - 1) {
                                return (
                                  <p key={i}>
                                    {item?.status} (
                                    {moment(item?.tanggal_pembuatan)?.format(
                                      "DD/MM/YYYY"
                                    ) ?? "-"}
                                    )
                                  </p>
                                );
                              }
                            }
                          })
                        )
                      ) : data?.data[0] ? (
                        detailStatusShown ? (
                          data?.data[0]?.status?.map((item, i) => {
                            return (
                              <p key={i}>
                                {item?.status ?? "-"} (
                                {moment(item?.tanggal_pembuatan)?.format(
                                  "DD/MM/YYYY"
                                ) ?? "-"}
                                ){" "}
                              </p>
                            );
                          })
                        ) : (
                          <p key={i}>
                            {data?.data[0]?.status[
                              data?.data[0]?.status.length - 1
                            ]?.status ?? "-"}{" "}
                            (
                            {moment(
                              data?.data[0]?.status[
                                data?.data[0]?.status.length - 1
                              ]?.tanggal_pembuatan
                            )?.format("DD/MM/YYYY") ?? "-"}
                            )
                          </p>
                        )
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Data Tidak Ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  // Modal component
  const modalComponentTugaskan = () => {
    return (
      <Modal
        isOpen={modalTugaskanOpen}
        centered={true}
        toggle={() => {
          tog_tugaskan();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Detail</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>John Smith</h1>
            <p>Admin surveyor</p>
          </div>
          <div>
            <p className={style.confirmation}>Setujui Pendaftaran akun?</p>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_tugaskan();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Batal
              </button>
              <button
                type='button'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={() => {
                  tog_tugaskan();
                  setalertVerifyStatus(style.alertOn);
                  setTimeout(() => {
                    setalertVerifyStatus(style.alertOf);
                  }, 2000);
                }}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
          <div className={`${alertVerifyStatus}`}>
            <Alert color='success'>Pengguna berhasil di verifikasi!</Alert>
          </div>
          {modalComponentTugaskan()}

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
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                      setbreadcrumbStatus("aksesinternet");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Hasil Survey</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                      setbreadcrumbStatus("bts");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Issue</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "3",
                    })}
                    onClick={() => {
                      toggleCustom("3");
                      setbreadcrumbStatus("bts");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Log</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto `}>
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
                        } else if (customActiveTab === "2") {
                          getDataIssueExport(1);
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
                        } else if (customActiveTab === "2") {
                          getDataIssueExport(2);
                        } else if (customActiveTab === "3") {
                          getDataLogExport(2);
                        }
                      }}
                    >
                      {excelButtonText}
                    </button>
                  </div>
                  <div className={`d-flex ${style.selectDropdown}`}>
                    <select
                      style={{}}
                      className='ml-auto'
                      onChange={(e) => {
                        // console.log(e.target.value);
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
                    value={selectedField}
                    className={`${style.searchFieldDropDown}`}
                    onChange={(e) => {
                      setselectedField(e.target.value);
                      setactiveSearch("search");
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
                    setpageNumber(1);
                    if (customActiveTab === "1") {
                      if (activeSearch === "tanggal") {
                        handleSearchHasil(selectedDate);
                      } else {
                        handleSearchHasil(searchInput);
                      }
                    } else if (customActiveTab === "2") {
                      if (activeSearch === "tanggal") {
                        handleSearchHasil(selectedDate);
                      } else {
                        handleSearchIssue(searchInput);
                      }
                    } else if (customActiveTab === "3") {
                      if (activeSearch === "tanggal") {
                        handleSearchHasil(selectedDate);
                      } else {
                        handleSearchLog(searchInput);
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
                {customActiveTab === "3" ? (
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
                ) : (
                  <select
                    className={`${style.filterSearchSelect} w-25 `}
                    name='field'
                    value={selectedField}
                    onChange={(e) => {
                      setselectedField(e.target.value);
                    }}
                  >
                    <option value=''>Pilih</option>
                    <option value='organization'>Instansi</option>
                  </select>
                )}

                {/* --- dropdown select value search input */}
                {customActiveTab === "3" ? (
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
                ) : (
                  <select
                    name='fieldvalue'
                    value={selectedFilter}
                    className={`${style.filterSearchSelect} w-75`}
                    onChange={(e) => {
                      setselectedFilter(e.target.value);
                      setactiveSearch("filter");
                    }}
                  >
                    <option value=''>Pilih</option>
                    {selectedField === "organization" &&
                    orgList &&
                    orgList.length !== 0 ? (
                      orgList?.map((org, index) => {
                        return (
                          <option value={org?.name} key={index}>
                            {org?.name ?? "Pilih Instansi"}
                          </option>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </select>
                )}

                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    if (customActiveTab === "1") {
                      handleSearchHasil(selectedFilter);
                    } else if (customActiveTab === "2") {
                      handleSearchIssue(selectedFilter);
                    } else if (customActiveTab === "3") {
                      handleSearchLog(selectedFilter);
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

              {/* ====================== Tab Survey / Issue / Log ====================== */}

              <TabContent activeTab={customActiveTab}>
                <TabPane tabId='1' className='p-3'>
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
                        tableStatus()
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='2' className='p-3'>
                  <Col sm='12'>
                    {loading ? (
                      <div
                        className='w-75 mx-auto'
                        style={{ fontSize: 20, lineHeight: 2.2 }}
                      >
                        <Skeleton height={20} count={5} />
                      </div>
                    ) : (
                      tableIssue()
                    )}
                  </Col>
                </TabPane>
                <TabPane tabId='3' className='p-3'>
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
                  disabled={disabledNextIssue}
                  className={`${style.paginationButton}`}
                  onClick={() => {
                    if (tableDataIssue?.length >= usersPerPage) {
                      setpageNumber((prev) => prev + 1);
                    }
                  }}
                >{`>`}</button>
              )}
              {customActiveTab === "3" && (
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
