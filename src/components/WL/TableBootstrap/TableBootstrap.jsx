import React, { useState, useEffect } from "react";
import { changeBreadcrumbItem } from "../../../store/breadcrumb/action";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  Alert,
} from "reactstrap";

// Tabs functions
import classnames from "classnames";

// IMPORT CUSTOM STYLING
import style from "./style.module.css";
// import "./style.css";

// IMPORT ASSETS
import AksiNoIcon from "../../../assets/icons/aksi-no.svg";
import AksiYesIcon from "../../../assets/icons/aksi-yes.svg";

//import API
import { url } from "../../../services/Config";
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton from "react-loading-skeleton";

function TableBootstrap() {
  // redux
  const dispatch = useDispatch();

  // states
  const [refresh, setrefresh] = useState(false);
  const [tableData, settableData] = useState([]); // untuk tab "Verifikasi"

  const [selectedTableData, setselectedTableData] = useState(null); // untuk simpan data ID untuk aksi verify atau decline
  const [loading, setloading] = useState(false); // untuk skeleton table Verifikasi

  //pagination states
  const [pageNumber, setpageNumber] = useState(1); // which page we are in
  const [dataPerPage, setdataPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  // styling states
  const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
  const [alertRejectStatus, setalertRejectStatus] = useState(style.alertOff);

  // modal states
  const [modalVerifyOpen, setmodalVerifyOpen] = useState(false);
  const [modalRejectOpen, setmodalRejectOpen] = useState(false);
  const [alasanTolak, setalasanTolak] = useState("");

  // endpoint query status
  const [queryStatus, setqueryStatus] = useState("");

  // filter states
  const [filterShow, setfilterShow] = useState("d-none");
  const [searchShow, setsearchShow] = useState("d-none");
  const [roleList, setroleList] = useState([]); // untuk dropdown list tipe
  const [orgList, setorgList] = useState([]); // untuk dropdown list instansi
  const [searchInput, setsearchInput] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [selectedField, setselectedField] = useState("");
  const [activeSearch, setactiveSearch] = useState("");
  const [selectStateField, setSelectStateField] = useState(true);

  // fetch api
  const getDataWLTable = () => {
    setloading(true);
    API.getDataWLTable(queryStatus, pageNumber, dataPerPage)
      .then((res) => {
        if (res.status === 200) {
          settableData(res.data.values);
          // console.table(res.data.values);
          if (res.data.values.length < dataPerPage) {
            setdisabledNext(true);
          } else {
            setdisabledNext(false);
          }
        } else {
          settableData([]);
        }
        setloading(false);
      })
      .catch((err) => {
        settableData([]);
        setloading(false);
        console.error(err);
      });
  };

  // useeffect

  useEffect(() => {
    dispatch(changeBreadcrumbItem("Aktif"));
  }, []);

  useEffect(() => {
    if (!selectedField) {
      getDataWLTable();
    } else {
      if (activeSearch === "search") {
        handleFilterSearch(searchInput);
      }
      if (activeSearch === "filter") {
        handleFilterSearch(selectedFilter);
      }
    }
    // getInitData();

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [refresh, queryStatus, dataPerPage, pageNumber]);

  // modal functions
  function tog_verfiy() {
    setmodalVerifyOpen(!modalVerifyOpen);
    removeBodyCss();
  }
  function tog_reject() {
    setmodalRejectOpen(!modalRejectOpen);
    settextarearequiredtext(false);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

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

  // Text Area Functions
  const [textcount, settextcount] = useState(0);
  const [textareabadge, settextareabadge] = useState(0);
  const [textarearequiredtext, settextarearequiredtext] = useState(false);
  function textareachange(event) {
    var count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  const handleFilterSearch = (searchData) => {
    setloading(true);
    API.getUserSearch(
      queryStatus,
      selectedField,
      searchData,
      dataPerPage,
      pageNumber
    )
      .then((res) => {
        if (res.data.success && res.status === 200) {
          // console.log("API SUCCESS :  > ", res);
          settableData(res.data.values);
          if (res.data.values.length < dataPerPage) {
            setdisabledNext(true);
          } else {
            setdisabledNext(false);
          }
        } else {
          // settableData(null);
          settableData([]);
        }
        setloading(false);
      })
      .catch((err) => {
        console.error("API FAIL :  > ", err);
        // settableData(null);
        settableData([]);
      });
  };

  // Table components
  const tableAktif = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <table className='table'>
            <thead>
              <tr>
                <th>No.</th>
                <th>Id wl</th>
                <th>Nama</th>
                <th>Url Website</th>
                <th>Url Admin</th>
                <th>Rekening</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.id_wl}</td>
                      <td>{data?.name}</td>
                      <td>{data?.url_website}</td>
                      <td>{data?.url_admin}</td>
                      <td>{data?.account_bank}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}{" "}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col className='col-12'>
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
                      dispatch(changeBreadcrumbItem("WhiteLabel Aktif"));
                      setqueryStatus();
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>WhiteLabel Aktif</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto`}>
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
                  <div className={`d-flex ${style.selectDropdown}`}>
                    <select
                      style={{}}
                      className='ml-auto'
                      onChange={(e) => {
                        console.log(e.target.value);
                        setdataPerPage(parseInt(e.target.value, 10));
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
                  className={`${style.tableSearchBar} align-items-center ${style.selectWrapper}`}
                >
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
                  <select
                    name='field'
                    value={selectedField}
                    className={`${style.searchFieldDropDown}`}
                    onChange={(e) => {
                      setselectedField(e.target.value);
                      setactiveSearch("search");
                      setSelectStateField(false);
                    }}
                  >
                    <option value=''>Pilih</option>
                    <option value='name'>Nama</option>
                    <option value='account_bank'>Rekening Bank</option>
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
                  name='field'
                  value={selectedField}
                  onChange={(e) => {
                    setselectedField(e.target.value);
                  }}
                >
                  <option value=''>Pilih</option>
                  <option value='name'>Nama</option>
                  <option value='account_bank'>Rekening Bank</option>
                </select>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    handleFilterSearch(selectedFilter);
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
                        tableAktif()
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
                  if (tableData?.length === dataPerPage) {
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
