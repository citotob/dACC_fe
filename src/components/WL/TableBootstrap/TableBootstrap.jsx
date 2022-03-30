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
  let roleName = window.localStorage.getItem("roleName");
  let userId = window.localStorage.getItem("userid");
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
  const [alertEditStatus, setalertEditStatus] = useState(style.alertOff);
  const [alertVerifyStatus, setalertVerifyStatus] = useState(style.alertOff);
  const [alertRejectStatus, setalertRejectStatus] = useState(style.alertOff);

  // modal states
  const [modalVerifyOpen, setmodalVerifyOpen] = useState(false);
  const [modalRejectOpen, setmodalRejectOpen] = useState(false);
  const [alasanTolak, setalasanTolak] = useState("");
  const [modalEditOpen, setmodalEditOpen] = useState(false);

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

  const [listurl_website, setListurl_website] = useState([]);
  const [inputurl_website, setInputurl_website] = useState("");

  const [listurl_admin, setListurl_admin] = useState([]);
  const [inputurl_admin, setInputurl_admin] = useState("");

  const [listAccBank, setListAccBank] = useState([]);
  const [inputAccBank, setInputAccBank] = useState("");
  const [accounts_bank, setAccounts_bank] = useState([]);

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
    
      API.getAccBank()
      .then((res) => {
        const accbankData = res?.data?.values ?? "";
        if (res.status === 200) {
          // setAccount_bank(accbankData);
          var lst_acc_bank = [];
          var k;
          for(k=0; k < accbankData.length; k++){
            lst_acc_bank.push(accbankData[k].id+"-"+accbankData[k].bank_name+"-"+accbankData[k].account+"-"+accbankData[k].name)
          }
          setAccounts_bank(lst_acc_bank);
          // console.log("accounts_bank",accounts_bank);
        }
      })
      .catch((err) => {
        console.log(err);
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
  // modal functions
  function tog_edit() {
    setmodalEditOpen(!modalEditOpen);
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

  // Action Button Functions
  const handleEditAction = (data) => {
    // console.log("data",data,listurl_website,listurl_admin,listAccBank);
    var lst_acc_bank = [];
    var a;
    var accBank;
    for(a=0; a < listAccBank.length; a++){
      accBank=listAccBank[a].split("-");
      lst_acc_bank.push(accBank[0])
    }
    
    let params = new URLSearchParams();
    params.append("id", data.id);
    params.append("userid", userId);
    params.append("name", data.name);
    params.append("url_website", listurl_website.join());
    params.append("url_admin", listurl_admin.join());
    params.append("account_bank", lst_acc_bank.join());
    API.putUpdateWL(params)
      .then((res) => {
        if (res.status === 200) {
          console.log("Handle Approve Action 200 : ", res);
        }
      })
      .catch((err) => {
        console.log("Handle Approve Catch Error : ", err);
      });
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
              <tr style={{backgroundColor : "#406d96", color : "white"}}>
                <th>No.</th>
                <th>Id wl</th>
                <th>Nama</th>
                <th>Url Website</th>
                <th>Url Admin</th>
                <th>Rekening</th>
                <th>-</th>
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
                      <td>
                        {data?.url_website?.length > 0 ? 
                          data?.url_website?.map((item) => {
                        return <tr>{item}</tr>
                        }) : (<></>)}
                      </td>
                      <td>
                        {data?.url_admin?.length > 0 ? 
                          data?.url_admin?.map((item) => {
                        return <tr>{item}</tr>
                        }) : (<></>)}
                      </td>
                      <td>
                        {data?.account_bank?.length > 0 ? 
                          data?.account_bank?.map((item) => {
                        return <tr>{item.bankname}-{item.account}-{item.name}</tr>
                        }) : (<></>)}
                      </td>
                      {roleName === "admin" ? (
                        <td className={`${style.aksiButtonsWrapper}`}>
                          <button
                            type='button'
                            onClick={() => {
                              tog_edit();
                              setselectedTableData(data);
                              setListurl_website(data?.url_website);
                              setListurl_admin(data?.url_admin);
                              var lst_acc_bank = [];
                              var ii;
                              for(ii=0; ii < data?.account_bank.length; ii++){
                                lst_acc_bank.push(data?.account_bank[ii].id+"-"+data?.account_bank[ii].bankname+"-"+data?.account_bank[ii].account+"-"+data?.account_bank[ii].name)
                              }
                              setListAccBank(lst_acc_bank);
                            }}
                            // className={`btn-block waves-effect ${style.noButton}`}
                            data-toggle='modal'
                            data-target='#myModal'
                          >
                            Edit
                          </button>
                        </td>
                      ) : (
                        <></>
                      )}
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

  const modalComponentEdit = () => {
    return (
      <Modal
        isOpen={modalEditOpen}
        centered={true}
        toggle={() => {
          tog_edit();
        }}
      >
        <div className={`modal-body ${style.modalBody}`}>
          <h5 className={style.title}>Update WL</h5>
          <div style={{ textAlign: "center" }}>
            <h1 className={style.name}>{selectedTableData?.name ?? ""}</h1>
            <p>{selectedTableData?.bankname ?? ""}</p>
          </div>
          <div>
            <div class="form-group">
              <label for="website" class="">URL Website</label>
              <input name="website" value={inputurl_website} onChange={(e) => setInputurl_website(e.target.value)} 
                class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>

              <button type='button' onClick={() => {
                setListurl_website((prevurl_website) => [...prevurl_website, inputurl_website])
                setInputurl_website("")
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListurl_website([])
              }}>Reset Data</button>
              
              {listurl_website.map((itemurl_website, k) => <p key={k}>{itemurl_website} | <span onClick={() => setListurl_website((prevurl_website) => prevurl_website.filter((e) => e !== itemurl_website))}>delete</span></p>)}
            </div>
            <div class="form-group">
              <label for="webadmin" class="">URL Admin</label>
              <input name="webadmin" value={inputurl_admin} onChange={(e) => setInputurl_admin(e.target.value)} 
                class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>

              <button type='button' onClick={() => {
                setListurl_admin((prevurl_admin) => [...prevurl_admin, inputurl_admin])
                setInputurl_admin("")
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListurl_admin([])
              }}>Reset Data</button>

              {listurl_admin.map((itemurl_admin, i) => <p key={i}>{itemurl_admin} | <span onClick={() => setListurl_admin((prevurl_admin) => prevurl_admin.filter((e) => e !== itemurl_admin))}>delete</span></p>)}
            </div>
            <div class="form-group">
              {/* <select
                name='accbank'
                onChange={(e) => setInputAccBank(e.target.value)}
                className={`form-control form-group ${style.placeholder}`}
              > */}
              <select
                name='accbank'
                onChange={(e) => {
                    if (!listAccBank.includes(e.target.value)) {
                      setInputAccBank(e.target.value)
                    }
                  }
                }
                className={`form-control form-group ${style.placeholder}`}
              >
                <option className={style.placeholder}>
                  Pilih Rekening Bank
                </option>
                {accounts_bank && accounts_bank.length !== 0 ? (
                  accounts_bank.map((accountBank, index) => {
                    return (
                      <option
                        className={style.placeholder}
                        // value={accountBank?.id+"-"+accountBank?.bankname+"-"+accountBank?.account+"-"+accountBank?.name}
                        value={accountBank}
                        key={index}
                      >
                        {/* {account_bank?.id}-{account_bank?.bankname}-{account_bank?.account}-{account_bank?.name} */}
                        {accountBank}
                      </option>
                    );
                  })
                ) : (
                  <option className={style.placeholder}>
                    Pilih Rekening Bank
                  </option>
                )}
              </select>
              <button type='button' onClick={() => {
                if (inputAccBank!=="") {
                  setListAccBank((prevAccBank) => [...prevAccBank, inputAccBank]);
                  setInputAccBank("");
                }
              }}>Add Data</button>
              <button type='button' onClick={() => {
                setListAccBank([])
              }}>Reset Data</button>

              {listAccBank.map((itemAccBank, j) => <p name="p_accbank" key={j}>{itemAccBank} | <span name="s_accbank" onClick={() => setListAccBank((prevAccBank) => prevAccBank.filter((e) => e !== itemAccBank))}>delete</span></p>)}
            </div>
            <div className={`span2 ${style.modalButtonWrapper}`}>
              <button
                type='button'
                onClick={() => {
                  tog_edit();
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
                  tog_edit();
                  // handleEditAction(selectedTableData?.id);
                  handleEditAction(selectedTableData);
                  setrefresh(!refresh);
                  setalertEditStatus(style.alertOn);
                  setTimeout(() => {
                    setalertEditStatus(style.alertOff);
                    setselectedTableData(null);
                  }, 2000);
                }}
              >
                Update
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
          <div className={`${alertEditStatus}`}>
            <Alert color='success'>WL berhasil diedit!</Alert>
          </div>
          {modalComponentEdit()}
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
