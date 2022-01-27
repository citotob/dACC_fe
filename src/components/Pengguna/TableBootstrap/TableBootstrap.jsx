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
import DokPenunjangIcon from "../../../assets/icons/dok-penunjang-icon.svg";
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
  const [usersPerPage, setusersPerPage] = useState(20);
  const [disabledPrev, setdisabledPrev] = useState(true);
  const [disabledNext, setdisabledNext] = useState(false);

  // styling states
  const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
  const [alertRejectStatus, setalertRejectStatus] = useState(style.alertOff);

  // modal states
  const [modalVerifyOpen, setmodalVerifyOpen] = useState(false);
  const [modalRejectOpen, setmodalRejectOpen] = useState(false);

  // endpoint query status
  const [queryStatus, setqueryStatus] = useState("status=belumterverifikasi");

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
  const getDataPenggunaTable = () => {
    setloading(true);
    API.getDataPenggunaTable(queryStatus, pageNumber, usersPerPage)
      .then((res) => {
        if (res.status === 200) {
          // console.log(
          //   "API SUCCESS : Fetch Data Pengguna Table Data : ",
          //   res.data
          // );
          settableData(res.data.values);
          console.table(res.data.values);
          if (res.data.values.length < usersPerPage) {
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
        // settableData(null);
        settableData([]);
        setloading(false);
        console.error(err);
      });
  };

  // initial data for dropdown role and organization list
  const getInitData = () => {
    API.getRole()
      .then((res) => {
        const roleData = res?.data?.values ?? "";

        if (res.status === 200) {
          console.log(roleData);
          setroleList(roleData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // const params = {
    //   surveyor: "all",
    //   jenis: "ai/bts",
    // };
    // API.getSurveyor(params)
    //   .then((res) => {
    //     const organizationData = res?.data?.values ?? "";
    //     if (res.status === 200) {
    //       setorgList(organizationData);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // useeffect

  useEffect(() => {
    dispatch(changeBreadcrumbItem("Verifikasi"));
  }, []);

  useEffect(() => {
    if (!selectedField) {
      getDataPenggunaTable();
    } else {
      if (activeSearch === "search") {
        handleFilterSearch(searchInput);
      }
      if (activeSearch === "filter") {
        handleFilterSearch(selectedFilter);
      }
    }
    getInitData();

    if (pageNumber > 1) {
      setdisabledPrev(false);
    } else {
      setdisabledPrev(true);
    }
  }, [refresh, queryStatus, usersPerPage, pageNumber]);

  // modal functions
  function tog_verfiy() {
    setmodalVerifyOpen(!modalVerifyOpen);
    removeBodyCss();
  }
  function tog_reject() {
    setmodalRejectOpen(!modalRejectOpen);
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

  // Action Button Functions
  const handleVerifyAction = (data) => {
    let params = new URLSearchParams();
    params.append("id", data);
    API.postUserVerify(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Handle Verify Action 200 : ", res);
        }
      })
      .catch((err) => {
        console.log("Handle Verify Catch Error : ", err);
      });
  };

  const handleDeclineAction = (data) => {
    let params = new URLSearchParams();
    params.append("id", data);
    API.postUserDecline(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Handle Decline Action 200 : ", res);
        }
      })
      .catch((err) => {
        console.log("Handle Decline Catch Error : ", err);
      });
  };

  const handleFilterSearch = (searchData) => {
    setloading(true);
    API.getUserSearch(
      queryStatus,
      selectedField,
      searchData,
      usersPerPage,
      pageNumber
    )
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
  const tableVerifikasi = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <table className='table'>
            <thead>
              <tr style={{backgroundColor : "#406d96", color : "white"}}>
                <th>No.</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Tipe</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.name}</td>
                      <td>{data?.username}</td>
                      <td>{data?.role_name}</td>
                      <td>{data?.email}</td>
                      <td className={`${style.aksiButtonsWrapper}`}>
                        <button
                          type='button'
                          onClick={() => {
                            tog_verfiy();
                            setselectedTableData(data);
                          }}
                          data-toggle='modal'
                          data-target='#myModal'
                        >
                          <img src={AksiYesIcon} alt='Icon Aksi Yes' />
                        </button>
                        <button
                          type='button'
                          onClick={() => {
                            tog_reject();
                            setselectedTableData(data);
                          }}
                          data-toggle='modal'
                          data-target='#myModal'
                        >
                          <img src={AksiNoIcon} alt='Icon Aksi No' />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}
      </div>
    );
  };
  const tableAktif = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <table className='table'>
            <thead>
              <tr style={{backgroundColor : "#406d96", color : "white"}}>
                <th>No.</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Tipe</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.name}</td>
                      <td>{data?.username}</td>
                      <td>{data?.role_name}</td>
                      <td>{data?.email}</td>
                      <td className={`${style.aksiButtonsWrapper}`}>
                        <button
                          type='button'
                          onClick={() => {
                            tog_reject();
                            setselectedTableData(data);
                          }}
                          data-toggle='modal'
                          data-target='#myModal'
                        >
                          <img src={AksiNoIcon} alt='Icon Aksi No' />
                        </button>
                      </td>
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
  const tableDitolak = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <table className='table'>
            <thead>
              <tr style={{backgroundColor : "#406d96", color : "white"}}>
                <th>No.</th>
                <th>Nama</th>
                <th>Username</th>
                <th>Tipe</th>
                <th>Email</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.name ?? ""}</td>
                      <td>{data?.username ?? ""}</td>
                      <td>{data?.role_name ?? ""}</td>
                      <td>{data?.email ?? ""}</td>
                      <td className={`${style.aksiButtonsWrapper}`}>
                        <button
                          type='button'
                          onClick={() => {
                            tog_verfiy();
                            setselectedTableData(data);
                          }}
                          data-toggle='modal'
                          data-target='#myModal'
                        >
                          <img src={AksiYesIcon} alt='Icon Aksi Yes' />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}
      </div>
    );
  };

  // Modal components
  const modalComponentVerify = () => {
    return (
      <Modal
        isOpen={modalVerifyOpen}
        centered={true}
        toggle={() => {
          tog_verfiy();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Verifikasi Pengguna</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{selectedTableData?.name ?? ""}</h1>
            <p>{selectedTableData?.role?.name ?? ""}</p>
          </div>
          <div>
            <p className={style.confirmation}>Setujui Pendaftaran akun?</p>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_verfiy();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Tutup
              </button>
              <button
                type='button'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={() => {
                  tog_verfiy();
                  handleVerifyAction(selectedTableData?.id);
                  setrefresh(!refresh);
                  setalertVerifyStatus(style.alertOn);
                  setTimeout(() => {
                    setalertVerifyStatus(style.alertOff);
                    setselectedTableData(null);
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

  const modalComponentReject = () => {
    return (
      <Modal
        isOpen={modalRejectOpen}
        centered={true}
        toggle={() => {
          tog_reject();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Tolak Pengguna</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{selectedTableData?.name ?? ""}</h1>
            <p>{selectedTableData?.role?.name ?? ""}</p>
          </div>
          <div className={`d-flex flex-column align-items-center gap16`}>
            <p className={style.confirmation}>Tolak pendaftaran akun?</p>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_reject();
                }}
                className={`btn-block waves-effect ${style.noButton}`}
                data-dismiss='modal'
              >
                Tutup
              </button>
              <button
                type='button'
                className={`bln-block waves-effect waves-light ${style.yesButton}`}
                onClick={() => {
                  tog_reject();
                  handleDeclineAction(selectedTableData?.id);
                  setrefresh(!refresh);
                  setalertRejectStatus(style.alertOn);
                  setTimeout(() => {
                    setalertRejectStatus(style.alertOff);
                    setselectedTableData(null);
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
      <Row>
        <Col className='col-12'>
          <div className={`${alertVerifyStatus}`}>
            <Alert color='success'>Pengguna berhasil di verifikasi!</Alert>
          </div>
          <div className={`${alertRejectStatus}`}>
            <Alert color='success'>Pengguna berhasil di reject!</Alert>
          </div>
          {modalComponentVerify()}
          {modalComponentReject()}
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
                      dispatch(changeBreadcrumbItem("Verifikasi"));
                      setqueryStatus("status=belumterverifikasi");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Verifikasi</span>
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
                      dispatch(changeBreadcrumbItem("Pengguna Aktif"));
                      setqueryStatus("status=aktif");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Pengguna Aktif</span>
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
                      dispatch(changeBreadcrumbItem("Pengguna Ditolak"));
                      setqueryStatus("status=tolak");
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Pengguna Ditolak</span>
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
                    <option value='username'>Username</option>
                    <option value='email'>Email</option>
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
                  <option value='role'>Tipe Pengguna</option>
                </select>
                {/* --- dropdown select value search input */}
                <select
                  name='fieldvalue'
                  className={`${style.filterSearchSelect} w-75`}
                  value={selectedFilter}
                  onChange={(e) => {
                    setselectedFilter(e.target.value);
                    setactiveSearch("filter");
                  }}
                >
                  {selectedField === "role" &&
                  roleList &&
                  roleList.length !== 0 ? (
                    roleList?.map((role, index) => {
                      return (
                        <option value={role?.name} key={index}>
                          {role?.name ?? "Pilih Tipe Pengguna"}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
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
                        tableVerifikasi()
                      )}
                    </Col>
                  </Row>
                </TabPane>
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
                        tableAktif()
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId='3' className='p-3'>
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
                        tableDitolak()
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
