import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NumberFormat from 'react-number-format';
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

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

function TableBootstrap() {
  let roleName = window.localStorage.getItem("roleName");
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
  const [alertRejectStatus, setalertRejectStatus] = useState(style.alertOff);

  // modal states
  const [modalEditOpen, setmodalEditOpen] = useState(false);

  // endpoint query status
  const [queryStatus, setqueryStatus] = useState("");

  // filter states
  const [filterShow, setfilterShow] = useState("d-flex");
  const [searchShow, setsearchShow] = useState("d-none");
  const [searchInput, setsearchInput] = useState("");
  const [selectedFilter, setselectedFilter] = useState("");
  const [selectedField, setselectedField] = useState("");
  const [activeSearch, setactiveSearch] = useState("");
  const [selectStateField, setSelectStateField] = useState(true);

  const [selectedJenis, setSelectedJenis] = useState("");
  const [desc, setDesc] = useState([]);
  const [whitelabel, setWhitelabel] = useState([]);
  const [selectedWhitelabel, setSelectedWhitelabel] = useState("");
  const [accountBank, setAccountBank] = useState([]);
  const [selectedAccountBank, setSelectedAccountBank] = useState("");
  const [amount, setAmount] = useState("");

  // modal error messages
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleAlert, settoggleAlert] = useState(false);
  const [toggleFailedAlert, settoggleFailedAlert] = useState(false);

  let userId = window.localStorage.getItem("userid");

  // fetch api
  const getDataReportBebanTable = () => {
    setloading(true);
    API.getDataReportBebanTable(queryStatus, pageNumber, dataPerPage)
      .then((res) => {
        if (res.status === 200) {
          settableData(res.data.values);
          // console.table("ok---",res.data.values);
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

      API.getWL()
      .then((res) => {
        const wlData = res?.data?.values ?? "";
        if (res.status === 200) {
          setWhitelabel(wlData);
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
      getDataReportBebanTable();
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
    API.getWL()
      .then((res) => {
        const wlData = res?.data?.values ?? "";
        if (res.status === 200) {
          setWhitelabel(wlData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
    // API.getAccBank()
    //   .then((res) => {
    //     const accbankData = res?.data?.values ?? "";
    //     if (res.status === 200) {
    //       setAccountBank(accbankData);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // if (filterShow === "d-none") {
      // setfilterShow("d-flex");
    // } else {
    //   setfilterShow("d-none");
    // }
    // if (searchShow === "d-none") {
    //   setsearchShow("d-none");
    // } else {
    //   setsearchShow("d-none");
    // }
  };
  const tog_search = () => {
    // if (searchShow === "d-none") {
    //   setsearchShow("d-flex");
    // } else {
    //   setsearchShow("d-none");
    // }
    // if (filterShow === "d-none") {
    //   setfilterShow("d-none");
    // } else {
    //   setfilterShow("d-none");
    // }
  };

  // Action Button Functions
  // const handleEditAction = (data) => {
  //   let params = new URLSearchParams();
  //   params.append("id", data);
  //   params.append("userid", userId);
  //   params.append("saldo", saldo);
  //   params.append("accUser", accUser);
  //   params.append("accPass", accPass);
  //   API.putUpdateAccBank(params)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log("Handle Approve Action 200 : ", res);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Handle Approve Catch Error : ", err);
  //     });
  // };

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
    // setloading(true);
    // API.getSearchAccBank(
    //   userId,
    //   selectedField,
    //   searchData,
    //   dataPerPage,
    //   pageNumber
    // )
    //   .then((res) => {
    //     if (res.data.success && res.status === 200) {
    //       // console.log("API SUCCESS :  > ", res);
    //       settableData(res.data.values);
    //       if (res.data.values.length < dataPerPage) {
    //         setdisabledNext(true);
    //       } else {
    //         setdisabledNext(false);
    //       }
    //     } else {
    //       // settableData(null);
    //       settableData([]);
    //     }
    //     setloading(false);
    //   })
    //   .catch((err) => {
    //     console.error("API FAIL :  > ", err);
    //     // settableData(null);
    //     settableData([]);
    //   });
  };

  const handleFilter = (searchData) => {
    var fields=",";
    if (selectedWhitelabel!=="Pilih White Label"){
      if (selectedWhitelabel!==""){
        fields+="whitelabel|"+selectedWhitelabel+",";
      }
    }
    if (selectedJenis!=="Pilih Jenis"){
      if (selectedJenis!==""){
        fields+="jenis|"+selectedJenis+",";
      }
    }
    
    if (fields!==","){
      setloading(true);
      let params = new URLSearchParams();
      params.append("fields",fields)
      API.getFilterBeban(params, pageNumber, dataPerPage)
        .then((res) => {
          if (res.status === 200) {
            settableData(res.data.values);
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
    }
  };

  // Table components
  const tableAktif = () => {
    return (
      <div className='table-responsive'>
        {tableData.length > 0 ? (
          <InfiniteScroll
            dataLength={tableData.length}
            next={() => {
              if (tableData?.length === dataPerPage) {
                setpageNumber((prev) => prev + 1);
              }
            }}
            hasMore={true}
            // loader={<h4>Loading more items...</h4>}
          >
          <table id="content">
            <thead>
              <tr style={{backgroundColor : "#406d96", color : "white"}}>
                <th>No.</th>
                <th>Tanggal</th>
                <th>jam</th>
                <th>No. Beban</th>
                <th>Jenis</th>
                <th>WL</th>
                <th>Rekening</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData?.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data?.tanggal}</td>
                      <td>{data?.jam}</td>
                      <td>{data?.number}</td>
                      <td>{data?.jenis}</td>
                      <td>{data?.whitelabel_name}</td>
                      <td>{data?.accountBank_bname}-{data?.accountBank_account}-{data?.accountBank_name}</td>
                      <td><NumberFormat value={data?.amount} displayType={'text'} thousandSeparator={true} prefix={''}
                        decimalScale={0} /></td>
                      {/* {roleName === "admin" ? (
                        <td className={`${style.aksiButtonsWrapper}`}>
                          <button
                            type='button'
                            onClick={() => {
                              setSaldo(data?.saldo);
                              setAccUser(data?.user_account);
                              setAccPass(data?.password_account);
                              tog_edit();
                              setselectedTableData(data);
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
                      )}                       */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          </InfiniteScroll>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}{" "}
      </div>
    );
  };

  // Modal components
  // const modalComponentEdit = () => {
  //   return (
  //     <Modal
  //       isOpen={modalEditOpen}
  //       centered={true}
  //       toggle={() => {
  //         tog_edit();
  //       }}
  //     >
  //       <div className={`modal-body ${style.modalBody}`}>
  //         <h5 className={style.title}>Update Rekening</h5>
  //         <div style={{ textAlign: "center" }}>
  //           <h1 className={style.name}>{selectedTableData?.bankname ?? ""}-{selectedTableData?.account ?? ""}
  //             -{selectedTableData?.name ?? ""}</h1>
  //           <p>{selectedTableData?.role?.name ?? ""}</p>
  //         </div>
  //         <div>
  //           {/* <p className={style.confirmation}>Update Saldo?</p> */}
  //           <div>
  //             <label for="saldo" class="">Saldo</label>
  //             <input type="number" name="saldo" pattern="[0-9]*" placeholder={selectedTableData?.saldo} onChange={(e) => setSaldo(e.target.value)} 
  //               class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>
  //             <label for="accUser" class="">User Rekeing</label>
  //             <input type="text" name="accUser" placeholder={selectedTableData?.user_account} onChange={(e) => setAccUser(e.target.value)} 
  //               class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>
  //             <label for="accPass" class="">Password Rekeing</label>
  //             <input type="text" name="accPass" placeholder={selectedTableData?.password_account} onChange={(e) => setAccPass(e.target.value)} 
  //               class="style_placeholder__3GMKG form-control is-untouched is-pristine av-invalid form-control"/>
  //           </div>
  //           <div className={`span2 ${style.modalButtonWrapper}`}>
  //             <button
  //               type='button'
  //               onClick={() => {
  //                 setSaldo("");
  //                 setAccUser("");
  //                 setAccPass("");
  //                 tog_edit();
  //               }}
  //               className={`btn-block waves-effect ${style.noButton}`}
  //               data-dismiss='modal'
  //             >
  //               Tutup
  //             </button>
  //             <button
  //               type='button'
  //               className={`bln-block waves-effect waves-light ${style.yesButton}`}
  //               onClick={() => {
  //                 tog_edit();
  //                 handleEditAction(selectedTableData?.id);
  //                 setrefresh(!refresh);
  //                 setalertEditStatus(style.alertOn);
  //                 setTimeout(() => {
  //                   setalertEditStatus(style.alertOff);
  //                   setselectedTableData(null);
  //                 }, 2000);
  //               }}
  //             >
  //               Iya
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </Modal>
  //   );
  // };

  return (
    <React.Fragment>
      <Row>
        <Col className='col-12'>
          <div className={`${alertEditStatus}`}>
            <Alert color='success'>Rekening berhasil diedit!</Alert>
          </div>
          {/* {modalComponentEdit()} */}
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
                      dispatch(changeBreadcrumbItem("Beban Aktif"));
                      setqueryStatus();
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Beban Aktif</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto`}>
                  {/* <button
                    onClick={() => {
                      tog_search();
                      setselectedField("");
                    }}
                  >
                    Search
                  </button> */}
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

              {/* <div
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
                    <option value='account'>Rekening</option>
                    <option value='name'>Nama</option>
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
              </div> */}

              <div
                className={`${filterShow} flex-row my-2 justify-content-end w-50 ml-auto ${style.filterSearchWrapper}`}
              >
                {/* ****** filter */}
                {/* --- dropdown select field  */}
                <select
                  name='whitelabel'
                  onChange={(e) => {
                    setSelectedWhitelabel(e.target.value);
                  }}
                  className={`form-control form-group ${style.placeholder}`}
                >
                  <option className={style.placeholder} value="" >
                    Pilih White Label
                  </option>
                  {whitelabel && whitelabel.length !== 0 ? (
                    whitelabel?.map((whitelabel, index) => {
                      return (
                        <option
                          className={style.placeholder}
                          value={whitelabel?.id}
                          key={index}
                        >
                          {whitelabel?.name ?? "Pilih White Label"}
                        </option>
                      );
                    })
                  ) : (
                    <option className={style.placeholder} value="" >
                      Pilih White Label
                    </option>
                  )}
                </select>
                {/* --- dropdown select value search input */}
                <select
                  name='jenis'
                  onChange={(e) => setSelectedJenis(e.target.value)}
                  className={`form-control form-group ${style.placeholder}`}
                >
                  <option className={style.placeholder}>
                    Pilih Jenis
                  </option>
                  <option value='gaji'>Gaji</option>
                  <option value='seo'>SEO</option>
                  <option value='akuran'>Akuran</option>
                  <option value='lain-lain'>Lain-lain</option>
                </select>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    handleFilter(selectedFilter);
                  }}
                >
                  Cari
                </button>
                <button
                  onClick={() => {
                    setSelectedWhitelabel("");
                    setSelectedJenis("");
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
              {/* <button
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
              >{`>`}</button> */}
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;
