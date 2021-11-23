import React, { useState, useEffect } from "react";

// import redux
import { changeBreadcrumbItem } from "../../../store/breadcrumb/action";
import { useDispatch, useSelector } from "react-redux";
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

// IMPORT ASSETS
import DokPenunjangIcon from "../../../assets/icons/dok-penunjang-icon.svg";

//import API
import { url } from "../../../services/Config";
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton from "react-loading-skeleton";
import get from "lodash/get";

import FilterCalendar from "../../../components/ModuleFilter/FilterDate/FilterDate";
import Localbase from "localbase";

// import redux
import { setBtsMain } from "../../../store/formSurveyStaff/action";
import { destroyBtsForm } from "../../../helpers/destroyReduxSessions/destroyBtsForm";

const moment = require("moment");
let db = new Localbase("db");

function TableBootstrap(props) {
  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);

  // from windows local storage
  let role = window.localStorage.getItem("roleName");
  const userid = window.localStorage.getItem("userid");
  const id_surveyor = window.localStorage.getItem("org");
  // states
  const [refresh, setrefresh] = useState(false);
  const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
  const [alertRejectStatus, setalertRejectStatus] = useState(style.alertOff);
  const [alertTugaskanStatus, setalertTugaskanStatus] = useState(
    style.alertOff
  );
  const [toggleButtonAI, settoggleButtonAI] = useState(`${style.togActiveBtn}`);
  const [toggleButtonBTS, settoggleButtonBTS] = useState(``);

  const toggleModalCalendar = () => {
    setModalCalendar(!modalCalendar);
  };

  const [dataDetailPenugasan, setdataDetailPenugasan] = useState({});
  const [dataTugaskanPenugasan, setdataTugaskanPenugasan] = useState({});
  const [loading, setloading] = useState(false); // untuk skeleton table Akses Internet
  const [tableData, settableData] = useState([]);
  const [staffData, setstaffData] = useState([]);
  const [activeTab, setactiveTab] = useState("ai");
  const [detailStatusShown, setDetailStatusShown] = useState(false);
  const [iconEyeToggle, seticonEyeToggle] = useState("bi-eye-slash");
  const [iconEyeTooltip, seticonEyeTooltip] = useState("Tampilkan Detail");
  const [assignedStaff, setassignedStaff] = useState(""); // dari milih dropdown modal tugaskan
  const [tugaskanAlertMessage, settugaskanAlertMessage] = useState("");
  const [tugaskanAlertStyle, settugaskanAlertStyle] = useState("");

  //pagination states
  const [pageNumber, setpageNumber] = useState(1); // which page we are in
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  // modal states
  const [modalReviewOpen, setmodalReviewOpen] = useState(false);
  const [modalAssignOpen, setmodalAssignOpen] = useState(false);

  // filter state
  const [filterShow, setfilterShow] = useState("d-none");
  const [searchShow, setsearchShow] = useState("d-none");
  const [filterCalendarShow, setFilterCalendarShow] = useState("d-none");
  const [roleList, setroleList] = useState([]); // untuk dropdown list tipe
  const [orgList, setorgList] = useState([]); // untuk dropdown list instansi
  const [searchInput, setsearchInput] = useState("");
  const [searchInputShow, setsearchInputShow] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [selectedField, setselectedField] = useState("");
  const [activeSearch, setactiveSearch] = useState("");
  const [selectStateField, setSelectStateField] = useState(true);
  let tablePenugasanStaff = [];

  // range date picker
  let initialEndDate = new Date();
  let initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 6);
  initialEndDate = moment(initialEndDate);
  initialStartDate = moment(initialStartDate);
  const [startDate, setStartDate] = useState(null); // Tanggal SLA Penyelesaian
  const [endDate, setEndDate] = useState(null); // Tanggal SLA Penyelesaian
  const [modalCalendar, setModalCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${initialStartDate.format("DD-MM-YYYY")} - ${initialEndDate.format(
      "DD-MM-YYYY"
    )}`
  );

  // modal functions
  function tog_review(data) {
    setmodalReviewOpen(!modalReviewOpen);
    removeBodyCss();
    setdataDetailPenugasan(data);
    console.log("data toggle :", data);
  }
  function tog_assign(data) {
    setmodalAssignOpen(!modalAssignOpen);
    removeBodyCss();
    setdataTugaskanPenugasan(data);
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
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

  // fetch api filter
  const getOrgList = () => {
    if (role === "admin") {
      const params = {
        surveyor: "all",
        jenis: "ai/bts",
      };
      API.getSurveyor(params)
        .then((res) => {
          console.log("res api get surveyor :", res?.data?.values);
          const organizationData = res?.data?.values ?? "";
          if (res.status === 200) {
            setorgList(organizationData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // fetch api untuk Table Admin
  const getPenugasanTable = () => {
    let params = {
      field: "all",
      jenis: activeTab,
      value: "all",
      row: usersPerPage,
      page: pageNumber,
    };

    let paramsStaff = {
      field: "assignto1",
      jenis: activeTab,
      value: userid,
      status: "on progress",
      row: usersPerPage,
      page: pageNumber,
    };

    setloading(true);

    if (role === "staffsurveyor") {
      API.getPenugasanTable(paramsStaff)
        .then(async (res) => {
          if (res.status === 200) {
            console.log("API Table Penugasan Staff Surveyor ", res.data.values);
            if (activeTab === "ai") {
              await sessionStorage.setItem(
                "tableDataPenugasanAI",
                JSON.stringify(res.data.values)
              );
              await settableData(
                JSON.parse(sessionStorage.getItem("tableDataPenugasanAI"))
              );
            } else if (activeTab === "bts") {
              await sessionStorage.setItem(
                "tableDataPenugasanBTS",
                JSON.stringify(res.data.values)
              );
              await settableData(
                JSON.parse(sessionStorage.getItem("tableDataPenugasanBTS"))
              );
            }

            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableData(null);
          setloading(false);
          console.log(err);
        });
    } else {
      API.getPenugasanTable(params)
        .then((res) => {
          if (res.status === 200) {
            // console.log("API Table Lokasi AI : ", res.data.values);
            settableData(res.data.values);

            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData(null);
          }
          setloading(false);
        })
        .catch((err) => {
          settableData(null);
          setloading(false);
          console.log(err);
        });
    }
  };
  // untuk Admin surveyor
  const getStaffSurveyor = () => {
    API.getStaffSurveyor(id_surveyor)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : getStaffSurveyor > ", res.data);
          setstaffData(res.data.values);
        }
      })
      .catch((err) => {
        console.log("API FAIL : getStaffSurveyor > ", err);
      });
  };

  const getPenugasanSurveyorTable = () => {
    let params = {
      field: "surveyor",
      jenis: activeTab,
      value: "all",
      row: usersPerPage,
      page: pageNumber,
      surveyor: id_surveyor,
    };
    setloading(true);
    API.getPenugasanSurveyorTable(params)
      .then((res) => {
        if (res.status === 200) {
          // console.log("API Table Lokasi AI : ", res.data.values);
          settableData(res.data.values);

          if (res.data.values.length < usersPerPage) {
            setdisabledNext(true);
          } else {
            setdisabledNext(false);
          }
        } else {
          settableData(null);
        }
        setloading(false);
      })
      .catch((err) => {
        settableData(null);
        setloading(false);
        console.log(err);
      });
  };

  // untuk assign
  const postAssignPenugasan = (data) => {
    let body = {
      user: userid,
      kode: data.kode,
      assignto: assignedStaff,
      ke: "2",
    };

    API.postAssignPenugasan(body)
      .then((res) => {
        // console.log("API success : STAFF ASSIGN ", res);
        settugaskanAlertStyle("success");
        setalertTugaskanStatus(style.alertOn);
        settugaskanAlertMessage("Pengguna berhasil ditugaskan!");
        setassignedStaff("");
        setTimeout(() => {
          setalertTugaskanStatus(style.alertOff);
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log("API FAIL : STAFF NOT ASSIGNED", err);
        settugaskanAlertStyle("danger");
        setalertTugaskanStatus(style.alertOn);
        settugaskanAlertMessage("Pengguna gagal ditugaskan!");
        setassignedStaff("");
        setTimeout(() => {
          setalertTugaskanStatus(style.alertOff);
          window.location.reload();
        }, 3000);
      });
  };

  // untuk change status
  const postChangeStatusPenugasan = (data) => {
    let body = {
      kode: data.kode,
      status: "on progress",
    };

    API.postChangeStatusPenugasan(body)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS : postChangeStatusPenugasan > ", res);
          postAssignPenugasan(dataTugaskanPenugasan);
        }
      })
      .catch((err) => {
        console.log("API FAIL : postChangeStatusPenugasan > ", err);
        settugaskanAlertStyle("danger");
        setalertTugaskanStatus(style.alertOn);
        settugaskanAlertMessage("Pengguna gagal ditugaskan!");
        setassignedStaff("");
        setTimeout(() => {
          setalertTugaskanStatus(style.alertOff);
          window.location.reload();
        }, 3000);
      });
  };

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

  const handleSubmitTugaskan = () => {
    postChangeStatusPenugasan(dataTugaskanPenugasan);
  };

  // useeffect
  useEffect(() => {
    dispatch(changeBreadcrumbItem("Akses Internet"));
  }, []);

  useEffect(() => {
    if (role === "admin" || role === "staffsurveyor") {
      if (!selectedField) {
        getPenugasanTable();
      } else {
        if (activeSearch === "search") {
          handleFilterSearch(searchInput);
        }
        if (activeSearch === "filter") {
          handleFilterSearch(selectedFilter);
        }
      }
    } else if (role === "adminsurveyor") {
      if (!selectedField) {
        getStaffSurveyor();
        getPenugasanSurveyorTable();
      } else {
        if (activeSearch === "search") {
          handleFilterSearch(searchInput);
        }
        if (activeSearch === "filter") {
          handleFilterSearch(selectedFilter);
        }
      }
    }

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [activeTab, usersPerPage, pageNumber, refresh]);

  // handle search / filter
  const handleFilterSearch = (searchData) => {
    setloading(true);
    let searchTerm =
      activeSearch === "search"
        ? searchInput.toUpperCase()
        : activeSearch === "filter"
        ? selectedFilter
        : "";
    if (role === "admin") {
      let params = {
        jenis: activeTab,
        field: selectedField,
        value: searchTerm,
        page: pageNumber,
        row: usersPerPage,
      };
      API.searchPenugasan(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS :  > ", res);
            settableData(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL :  > ", err);
          settableData(null);
        });
    } else if (role === "adminsurveyor") {
      let params = {
        jenis: activeTab,
        surveyor: id_surveyor,
        field: selectedField,
        value: searchTerm,
        page: pageNumber,
        row: usersPerPage,
      };
      API.searchPenugasanSurveyor(params)
        .then((res) => {
          if (res.data.success && res.status === 200) {
            // console.log("API SUCCESS :  > ", res);
            settableData(res.data.values);
            if (res.data.values.length < usersPerPage) {
              setdisabledNext(true);
            } else {
              setdisabledNext(false);
            }
          } else {
            settableData(null);
          }
          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.error("API FAIL :  > ", err);
          settableData(null);
        });
    }
  };

  // Tabs functions (Daftar penugasan, Log)
  const [customActiveTab, setcustomActiveTab] = useState("1");
  function toggleCustom(tab) {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  }
  // Tabs functions (verifikasi, aktif, ditolak)

  //modal detail items component
  const ModalDetailItems = ({ label, data }) => {
    return (
      <div className={`d-flex flex-row ${style.detailItemWrapper}`}>
        <span className={`${style.detailItemLabel}`}>{label}</span>
        <span className='mx-2'>:</span>
        <span>{data}</span>
      </div>
    );
  };

  // Modal component reviewed
  const modalComponentReviewed = () => {
    return (
      <Modal
        isOpen={modalReviewOpen}
        // isOpen={true}
        centered={true}
        toggle={() => {
          tog_review();
        }}
      >
        <div className={`modal-body px-4 ${style.modalBody}`}>
          <div className='px-4'>
            <div className={` ${style.modalTitleWrapper}`}>
              <div
                className={`d-flex flex-column align-items-center ${style.modalTopTitle}`}
              >
                <h3>Detail Penugasan</h3>
              </div>
              <div
                className={`d-flex flex-column align-items-center mt-2 mb-4 ${style.modalBottomTitle}`}
              >
                <h4 className={`text-center`}>
                  {dataDetailPenugasan?.lokasisurvey?.desa?.name ?? "-"} |{" "}
                  {dataDetailPenugasan?.kode ?? "-"}
                </h4>
                <p className={``}>
                  Status :{" "}
                  {dataDetailPenugasan?.status?.slice(-1).pop().status ?? "-"}
                </p>
                <div className='d-flex flex-row'>
                  <span>
                    {dataDetailPenugasan?.lokasisurvey?.latitude ?? "-"}
                  </span>
                  <span className='mx-2'>|</span>
                  <span>
                    {dataDetailPenugasan?.lokasisurvey?.longitude ?? "-"}
                  </span>
                </div>
              </div>
              <div
                className={`d-flex flex-column align-items-start ${style.modalContentWrapper}`}
              >
                <div>
                  <p>Jenis Penugasan</p>
                  <p className={`text-center ${style.jenisPenugasan}`}>
                    {dataDetailPenugasan?.jenissurvey?.jenis === "AI"
                      ? "Akses Internet"
                      : "BTS"}
                  </p>
                </div>

                {/* ================== LIST DATA DETAIL START ===  */}
                <ModalDetailItems
                  label='Nama Instansi Survey'
                  data={dataDetailPenugasan?.surveyor?.name ?? "-"}
                />
                <ModalDetailItems
                  label='Tanggal Penugasan dari BAKTI'
                  data={
                    moment(dataDetailPenugasan?.tanggal_penugasan)?.format(
                      "DD/MM/YYYY"
                    ) ?? "-"
                  }
                />
                <ModalDetailItems
                  label='SLA Tanggal Penyelesaian'
                  data={
                    moment(dataDetailPenugasan?.target)?.format("DD/MM/YYYY") ??
                    "-"
                  }
                />
                <ModalDetailItems
                  label='No. SPK'
                  data={dataDetailPenugasan?.nospk ?? "-"}
                />
                <ModalDetailItems
                  label='File SPK'
                  data='File SPK tidak tersedia'
                />
                <ModalDetailItems
                  label='Staff yang ditugaskan'
                  data={dataDetailPenugasan?.assignto1?.name ?? "-"}
                />
                <ModalDetailItems
                  label='Tanggal ditugaskan ke staff'
                  // data={dataDetailPenugasan?.assignto1?.name ?? "-"}
                  data={
                    dataDetailPenugasan?.status
                      ? get(dataDetailPenugasan?.status, "[2].status") ===
                        "on progress"
                        ? moment(
                            get(dataDetailPenugasan?.status, "[2]").date
                          ).format("DD/MM/YYYY")
                        : "-"
                      : "-"
                  }
                />
                {/* ================== LIST DATA DETAIL END ===  */}
              </div>
            </div>
            <div>
              <div
                className={`span2 d-flex align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
              >
                <button
                  type='button'
                  onClick={() => {
                    tog_review();
                  }}
                  className={`btn-block waves-effect ${style.noButton}`}
                  data-dismiss='modal'
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // API Calls for Modal Component Assigned
  // const getPenugasanSurveyor = () => {
  //   let params = {
  //     field: "surveyor",
  //     jenis: activeTab.toUpperCase(),
  //     surveyor: "5f1ed9e2d15fc0017547dcd5",
  //     value: "all",
  //   };
  //   API.getPenugasanSurveyor(params)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err.response));
  // };

  // useEffect(() => {
  //   getPenugasanSurveyor();
  // }, [activeTab]);

  // Modal component assigned
  const modalComponentAssigned = () => {
    return (
      <Modal
        isOpen={modalAssignOpen}
        // isOpen={true}
        centered={true}
        toggle={() => {
          tog_assign();
          setassignedStaff("");
        }}
      >
        <div className={`modal-body px-4 ${style.modalBody}`}>
          <div className='px-4'>
            <div className={` ${style.modalTitleWrapper}`}>
              <div
                className={`d-flex flex-column align-items-center ${style.modalTopTitle}`}
              >
                <h3>Detail Penugasan</h3>
              </div>
              <div
                className={`d-flex flex-column align-items-center mt-2 mb-4 ${style.modalBottomTitle}`}
              >
                <h4 className={`text-center`}>
                  {dataTugaskanPenugasan?.lokasisurvey?.desa?.name ?? "-"} |{" "}
                  {dataTugaskanPenugasan?.kode ?? "-"}
                </h4>
                <p className={``}>
                  Status :{" "}
                  {dataTugaskanPenugasan?.status?.slice(-1).pop().status ?? "-"}
                </p>
                <div className='d-flex flex-row'>
                  <span>
                    {dataTugaskanPenugasan?.lokasisurvey?.latitude ?? "-"}
                  </span>
                  <span className='mx-2'>|</span>
                  <span>
                    {dataTugaskanPenugasan?.lokasisurvey?.longitude ?? "-"}
                  </span>
                </div>
              </div>
              <div
                className={`d-flex flex-column align-items-start ${style.modalContentWrapper}`}
              >
                <div>
                  <p>Jenis Penugasan</p>
                  <p className={`text-center ${style.jenisPenugasan}`}>
                    {dataTugaskanPenugasan?.jenissurvey?.jenis === "AI"
                      ? "Akses Internet"
                      : "BTS"}
                  </p>
                </div>

                {/* ================== LIST DATA TUGASKAN START ===  */}

                <ModalDetailItems
                  label='Tanggal Penugasan dari BAKTI'
                  data={
                    moment(dataTugaskanPenugasan?.tanggal_penugasan)?.format(
                      "DD/MM/YYYY"
                    ) ?? "-"
                  }
                />
                <ModalDetailItems
                  label='SLA Tanggal Penyelesaian'
                  data={
                    moment(dataTugaskanPenugasan?.target)?.format(
                      "DD/MM/YYYY"
                    ) ?? "-"
                  }
                />
                <ModalDetailItems
                  label='No. SPK'
                  data={dataTugaskanPenugasan?.nospk ?? "-"}
                />
                <ModalDetailItems
                  label='File SPK'
                  data={
                    dataTugaskanPenugasan?.spk ? (
                      <a
                        href={`${url}${dataTugaskanPenugasan.spk.path}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img src={DokPenunjangIcon} alt='Icon Dok. Penunjang' />
                      </a>
                    ) : (
                      "File SPK tidak tersedia"
                    )
                  }
                />
                {/* ================== LIST DATA TUGASKAN END ===  */}
                <p>Beri Penugasan</p>
                <form className={`${style.formWrapper}`}>
                  <div className='form-group'>
                    <label htmlFor='staffSurveyorName'>
                      Nama Staff Surveyor
                    </label>
                    <select
                      className='form-control'
                      id='staffSurveyorName'
                      onChange={(e) => setassignedStaff(e.target.value)}
                    >
                      <option defaultValue>Pilih Staff</option>
                      {staffData?.map((data, i) => {
                        return (
                          <option key={i} value={data?.id}>
                            {data?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* <div className='form-group'>
                    <label htmlFor='surveyorDate'>
                      Tanggal Penugasan Staff Surveyor
                    </label>
                    <input
                      type='date'
                      id='surveyorDate'
                      name='birthday'
                      className='form-control'
                    />
                  </div> */}
                  <div
                    className={`d-flex align-items-center justify-content-center mt-4 ${style.modalButtonWrapper}`}
                  >
                    <button
                      type='button'
                      onClick={() => {
                        tog_assign();
                        setassignedStaff("");
                      }}
                      className={`btn-block waves-effect ${style.noButton}`}
                      data-dismiss='modal'
                    >
                      Tutup
                    </button>
                    {assignedStaff !== "" ? (
                      <button
                        type='submit'
                        onClick={(e) => {
                          e.preventDefault();
                          tog_assign();
                          handleSubmitTugaskan();
                        }}
                        className={`btn-block waves-effect ${style.yesButton}`}
                        data-dismiss='modal'
                      >
                        Tugaskan
                      </button>
                    ) : (
                      <button
                        type='submit'
                        disabled
                        className={`btn-block waves-effect ${style.yesButton}`}
                        data-dismiss='modal'
                      >
                        Tugaskan
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // Table components
  const tableDaftar = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Kode Survey</th>
              <th>Instansi Surveyor</th>
              <th>Lokasi Survey</th>
              <th>SLA Tanggal Penyelesaian</th>
              <th>Status Penugasan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {role === "staffsurveyor" ? (
            <tbody>
              {activeTab === "ai" &&
              JSON.parse(sessionStorage.getItem("tableDataPenugasanAI")) ? (
                JSON.parse(sessionStorage.getItem("tableDataPenugasanAI"))?.map(
                  (data, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data?.kode ?? "-"}</td>
                        <td>{data?.surveyor?.name ?? "-"}</td>
                        <td>{data?.lokasisurvey?.desa?.name ?? "-"}</td>
                        <td>
                          {moment(data?.target)?.format("DD/MM/YYYY") ?? "-"}
                        </td>
                        <td>{data?.status?.slice(-1).pop().status ?? "-"}</td>
                        <td className={`${style.aksiButtonsWrapper}`}>
                          <Link
                            to={{
                              pathname: `/staffsurveyor/penugasan/${activeTab}/${data?._id}`,
                              state: {
                                datatable: data,
                                activeTab: activeTab,
                              },
                            }}
                          >
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                              onClick={() => {
                                db.collection(
                                  eval("strBtsMain").concat(data._id)
                                ).get();
                              }}
                            >
                              Input Data
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : activeTab === "bts" &&
                JSON.parse(sessionStorage.getItem("tableDataPenugasanBTS")) ? (
                JSON.parse(
                  sessionStorage.getItem("tableDataPenugasanBTS")
                )?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.kode ?? "-"}</td>
                      <td>{data?.surveyor?.name ?? "-"}</td>
                      <td>{data?.lokasisurvey?.desa?.name ?? "-"}</td>
                      <td>
                        {moment(data?.target)?.format("DD/MM/YYYY") ?? "-"}
                      </td>
                      <td>{data?.status?.slice(-1).pop().status ?? "-"}</td>
                      <td className={`${style.aksiButtonsWrapper}`}>
                        <Link
                          to={{
                            pathname: `/staffsurveyor/penugasan/${activeTab}/${data?._id}`,
                            state: {
                              datatable: data,
                              activeTab: activeTab,
                            },
                          }}
                        >
                          <button
                            type='button'
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Input Data
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>"Tidak Ada Data"</td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              {tableData && tableData.length ? (
                tableData.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.kode ?? "-"}</td>
                      <td>{data?.surveyor?.name ?? "-"}</td>
                      <td>{data?.lokasisurvey?.desa?.name ?? "-"}</td>
                      <td>
                        {moment(data?.target)?.format("DD/MM/YYYY") ?? "-"}
                      </td>
                      <td>{data?.status?.slice(-1).pop().status ?? "-"}</td>
                      <td className={`${style.aksiButtonsWrapper}`}>
                        {role === "admin" && (
                          <button
                            type='button'
                            onClick={() => {
                              tog_review(data);
                            }}
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Detail
                          </button>
                        )}
                        {role === "adminsurveyor" &&
                        data?.status?.slice(-1).pop().status === "assigned" ? (
                          <button
                            type='button'
                            onClick={() => {
                              tog_assign(data);
                            }}
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Tugaskan
                          </button>
                        ) : role === "adminsurveyor" ? (
                          <button
                            type='button'
                            onClick={() => {
                              tog_review(data);
                            }}
                            data-toggle='modal'
                            data-target='#myModal'
                            className={`${style.tugaskanButton}`}
                          >
                            Detail
                          </button>
                        ) : role === "staffsurveyor" ? (
                          <Link
                            to={{
                              pathname: `/staffsurveyor/penugasan/${activeTab}/${data?._id}`,
                              state: { datatable: data, activeTab: activeTab },
                            }}
                          >
                            <button
                              type='button'
                              data-toggle='modal'
                              data-target='#myModal'
                              className={`${style.tugaskanButton}`}
                            >
                              Input Data
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {/* {data?.status.slice(-1).pop().status == "ASSIGNED" ?? (
                      <button
                        type='button'
                        onClick={() => {
                          tog_assign(data);
                        }}
                        data-toggle='modal'
                        data-target='#myModal'
                        className={`${style.tugaskanButton}`}
                      >
                        Tugaskan
                      </button>
                    ) } */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>"Tidak Ada Data"</td>
                </tr>
              )}
            </tbody>
          )}
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
              <th>Lokasi Survey</th>
              <th>Tanggal</th>
              <th>
                Status Penugasan{" "}
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
            {tableData && tableData.length ? (
              tableData?.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data?.kode ?? ""}</td>
                    <td>{data?.lokasisurvey?.desa?.name ?? ""}</td>
                    <td>{moment(data?.target)?.format("DD/MM/YYYY") ?? ""}</td>
                    {!detailStatusShown && (
                      <td>
                        {data?.status?.slice(-1).pop().status ?? ""} (
                        {moment(data?.status?.slice(-1).pop().date)?.format(
                          "DD/MM/YYYY"
                        ) ?? "-"}
                        )
                      </td>
                    )}
                    {detailStatusShown && (
                      <td>
                        {data?.status?.map((item, i) => {
                          return (
                            <p key={i}>
                              {item?.status} (
                              {moment(item?.date)?.format("DD/MM/YYYY") ?? "-"})
                            </p>
                          );
                        })}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>"Tidak Ada Data"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // handleSubmit();
    }
  };

  const handleChangeDate = (e, picker) => {
    setStartDate(moment(picker.startDate));
    setEndDate(moment(picker.endDate));
  };

  // real component
  return (
    <React.Fragment>
      <FilterCalendar
        modalCalendar={modalCalendar}
        toggleModalCalendar={toggleModalCalendar}
        selectedDate={handleSelectedDate}
      />
      <Row>
        <Col className='col-12'>
          <div className={`${alertTugaskanStatus}`}>
            <Alert color={tugaskanAlertStyle}>{tugaskanAlertMessage}</Alert>
          </div>
          <div className={`${alertVerifyStatus}`}>
            <Alert color='success'>Pengguna berhasil di verifikasi!</Alert>
          </div>
          <div className={`${alertRejectStatus}`}>
            <Alert color='success'>Pengguna berhasil di reject!</Alert>
          </div>
          {modalComponentReviewed()}
          {modalComponentAssigned()}

          {/* ====================== Toggle Buttons Akses Internet / BTS ===== */}
          <div className={`${style.toggleTableButtonWrapper}`}>
            <button
              className={`${toggleButtonAI}`}
              onClick={() => {
                settoggleButtonAI(`${style.togActiveBtn}`);
                settoggleButtonBTS("");
                setactiveTab("ai");
                setpageNumber(1);
                dispatch(changeBreadcrumbItem("Akses Internet"));
              }}
            >
              Akses Internet
            </button>
            <button
              className={`${toggleButtonBTS}`}
              onClick={() => {
                settoggleButtonAI("");
                settoggleButtonBTS(`${style.togActiveBtn}`);
                setactiveTab("bts");
                setpageNumber(1);
                dispatch(changeBreadcrumbItem("BTS"));
              }}
            >
              BTS
            </button>
          </div>
          {/* ====================== Toggle Buttos Akses Internet / BTS ===== */}

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
                      props.setbreadcrumbStatus("aksesinternet");
                    }}
                  >
                    <span className={`${style.pageFont} d-none d-sm-block`}>
                      Daftar Penugasan
                    </span>
                  </NavLink>
                </NavItem>
                {/* kalau di staffsurveyor, engga ada log penugasan  */}
                {role !== "staffsurveyor" && (
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "2",
                      })}
                      onClick={() => {
                        toggleCustom("2");
                        props.setbreadcrumbStatus("bts");
                      }}
                    >
                      <span className='d-none d-sm-block'>Log</span>
                    </NavLink>
                  </NavItem>
                )}

                <div className={`${style.tableSearchWrapper} ml-auto`}>
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
                      </button>{" "}
                    </>
                  )}
                  <div className={`d-flex ${style.selectDropdown}`}>
                    <select
                      style={{}}
                      className='ml-auto'
                      onChange={(e) => {
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
                  {/* <div className={`${style.tableSearchButtonWrapper}`}>
                    <button className={`${style.tableSearchButton}`}>
                      import
                    </button>
                    <button className={`${style.tableSearchButton}`}>
                      export
                    </button>
                  </div> */}
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
                      setSelectStateField(false);
                      if (e.target.value === "tglsla") {
                        setFilterCalendarShow("");
                        setsearchInputShow("d-none");
                      }
                      if (
                        e.target.value === "kode" ||
                        e.target.value === "lokasi"
                      ) {
                        setFilterCalendarShow("d-none");
                        setsearchInputShow("");
                      }
                    }}
                  >
                    <option value=''>Pilih</option>
                    <option value='kode'>Kode</option>
                    <option value='lokasi'>Lokasi</option>
                    {/* tanggal SLA   */}
                    <option value='tglsla'>Tanggal</option>
                  </select>
                </div>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    handleFilterSearch(searchInput);
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
                    setSelectStateField(true);
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
                <select
                  className={`${style.filterSearchSelect} w-25 `}
                  value={selectedField}
                  name='field'
                  onChange={(e) => {
                    setselectedField(e.target.value);
                    getOrgList();
                  }}
                >
                  <option value=''>Pilih</option>
                  {role === "admin" ? (
                    <option value='surveyor'>Instansi</option>
                  ) : (
                    ""
                  )}
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
                  <option value=''>
                    Pilih{" "}
                    {selectedField === "surveyor"
                      ? "Instansi"
                      : selectedField === "status"
                      ? "Status"
                      : ""}
                  </option>
                  {selectedField === "surveyor" &&
                  role === "admin" &&
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
                  {selectedField === "status" && (
                    <>
                      <option value='created'>Created</option>
                      <option value='assigned'>Assigned</option>
                      <option value='on progress'>On Progress</option>
                      <option value='reviewed'>Reviewed</option>
                      <option value='finished'>Finished</option>
                    </>
                  )}
                </select>

                <button
                  className={`${style.searchButton}`}
                  onClick={
                    () => {
                      setpageNumber(1);
                      handleFilterSearch(selectedFilter);
                    }
                    // console.log("clicked")
                  }
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
                  }}
                >
                  Reset
                </button>
              </div>
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
                        tableDaftar()
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='2' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loading && role !== "staffsurveyor" ? (
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
              <button
                disabled={disabledNext}
                className={`${style.paginationButton}`}
                onClick={() => {
                  if (tableData?.length === usersPerPage) {
                    setpageNumber((prev) => prev + 1);
                  }
                }}
              >{`>`}</button>
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;
