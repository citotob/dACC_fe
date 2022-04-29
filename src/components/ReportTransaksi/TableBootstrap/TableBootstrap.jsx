import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
import NumberFormat from 'react-number-format';

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

  const [dataWL, setdataWL] = useState("");

  const [ticket_id, setTicket_id] = useState("");
  const [member, setMember] = useState("");
  const [bank_member, setBank_member] = useState("");
  const [account_bank, setAccount_bank] = useState([]);
  const [selectedAccBank, setSelectedAccBank] = useState("");
  const [account_bankAll, setAccount_bankAll] = useState([]);
  const [selectedAccBankAll, setSelectedAccBankAll] = useState([]);
  const [amount, setAmount] = useState("");
  const [whitelabel, setWhitelabel] = useState([]);
  const [selectedWhitelabel, setSelectedWhitelabel] = useState("");
  const [dariTanggal, setDariTanggal] = useState("");
  const [sampaiTanggal, setSampaiTanggal] = useState("");
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  // fetch api
  const getDataReportTransaksiTable = () => {
    setloading(true);
    API.getDataReportTransaksiTable(queryStatus, pageNumber, dataPerPage)
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
  };

  // useeffect
  useEffect(() => {
    dispatch(changeBreadcrumbItem("Aktif"));
  }, []);

  useEffect(() => {
    if (!selectedField) {
      getDataReportTransaksiTable();
    } else {
      if (activeSearch === "search") {
        handleSearch(searchInput);
      }
      if (activeSearch === "filter") {
        handleFilter(selectedFilter);
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
    if (dataWL === ""){
      setdataWL("ok");
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
        
      API.getAccBank()
        .then((res) => {
          const accbankData = res?.data?.values ?? "";
          if (res.status === 200) {
            setAccount_bankAll(accbankData);
            setAccount_bank(accbankData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const handleFilter = (searchData) => {
    var fields=",";
    if (selectedWhitelabel!=="Pilih White Label"){
      if (selectedWhitelabel!==""){
        fields+="whitelabel|"+selectedWhitelabel+",";
      }
    }
    if (selectedAccBank!=="Pilih Rekening Bank"){
      if (selectedAccBank!==""){
        fields+="bank_destination|"+selectedAccBank+",";
      }
    }
    if (selectedStatus!=="Pilih Status"){
      if (selectedStatus!==""){
        fields+="status|"+selectedStatus+",";
      }
    }
    if (dariTanggal!==""){
      fields+="create_date_from|"+dariTanggal+",";
    }
    if (sampaiTanggal!==""){
      fields+="create_date_end|"+sampaiTanggal+",";
    }
    
    if (fields!==","){
      setloading(true);
      let params = new URLSearchParams();
      params.append("fields",fields)
      API.getFilterReport(params, pageNumber, dataPerPage)
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

  const handleSearch = (searchData) => {
    setloading(true);
    let params = new URLSearchParams();
    params.append("field",selectedField)
    params.append("value",searchData)
    API.getSearchReport(params, pageNumber, dataPerPage)
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
  };

  // Table components
  const tableAktif = () => {
    var total_debit=0;
    var total_kredit=0;
    console.log("tableData",tableData);
    return (
      <div className='table-responsive'>
        <InfiniteScroll
          dataLength={tableData.length}
          next={() => {
            if (tableData?.length === dataPerPage) {
              setpageNumber((prev) => prev + 1);
            }
          }}
          hasMore={true}
          loader={<h4>Loading more items...</h4>}
        >
        {tableData.length > 0 ? (
            <table id="content">
              <thead>
                <tr style={{backgroundColor : "#406d96", color : "white"}}>
                  <th>No.</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>WL</th>
                  <th>Tiket</th>
                  <th>Member</th>
                  <th>User</th>
                  <th>Rekening</th>
                  <th>Depo/WD</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 &&
                  tableData?.map((data, i) => {
                    total_debit+=Number(data?.debit);
                    total_kredit+=Number(data?.kredit);
                    console.log(total_debit)
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data?.tanggal}</td>
                        <td>{data?.jam}</td>
                        <td>{data?.wl_name}</td>
                        <td>{data?.ticket_id}</td>
                        <td>{data?.member}</td>
                        <td>{data?.user_name}</td>
                        <td>{data?.bank_bname}-{data?.bank_account}-{data?.bank_name}</td>
                        <td>{data?.jenis}</td>
                        <td><NumberFormat value={data?.debit} displayType={'text'} thousandSeparator={true} prefix={''}
                          decimalScale={0} /></td>
                        <td><NumberFormat value={data?.kredit} displayType={'text'} thousandSeparator={true} prefix={''}
                          decimalScale={0} /></td>
                        <td>{data?.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                  <th></th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><NumberFormat value={total_debit} displayType={'text'} thousandSeparator={true} prefix={''}
                    decimalScale={0} /></td>
                  <td><NumberFormat value={total_kredit} displayType={'text'} thousandSeparator={true} prefix={''}
                    decimalScale={0} /></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
        ) : (
          <p>Tidak Ditemukan Data</p>
        )}{" "}
        </InfiniteScroll>
      </div>
    );
  };

  function getAccBankWL(data) {
    if (data==="Pilih White Label"){
      setAccount_bank(account_bankAll);
    } else {
      let params = new URLSearchParams();
      params.append("id",data)
      API.getWLById(params)
        .then((res) => {
          const accBankData = res?.data?.values ?? "";
          if (res.status === 200) {
            setAccount_bank(accBankData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                      dispatch(changeBreadcrumbItem("Report Transaksi"));
                      setqueryStatus();
                      setpageNumber(1);
                    }}
                  >
                    <span className='d-none d-sm-block'>Report Transaksi</span>
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
                        setdataPerPage(parseInt(e.target.value, 20));
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
                    <option value='ticket_id'>Tiket</option>
                    <option value='member'>Member</option>
                  </select>
                </div>
                <button
                  className={`${style.searchButton}`}
                  onClick={() => {
                    setpageNumber(1);
                    handleSearch(searchInput);
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
                className={`${filterShow} flex-row my-2 justify-content-end w-100 ml-auto ${style.filterSearchWrapper}`}
              >
                {/* ****** filter */}
                {/* --- dropdown select field  */}
                <select
                  name='whitelabel'
                  onChange={(e) => {
                    setSelectedWhitelabel(e.target.value);
                    getAccBankWL(e.target.value);
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
                <select
                  name='bank'
                  onChange={(e) => setSelectedAccBank(e.target.value)}
                  className={`form-control form-group ${style.placeholder}`}
                >
                  <option value="" className={style.placeholder}>
                    Pilih Rekening Bank 
                  </option>
                  {account_bank && account_bank.length !== 0 ? (
                    account_bank?.map((account_bank, index) => {
                      return (
                        <option
                          className={style.placeholder}
                          value={account_bank?.id}
                          key={index}
                        >
                          {/* {bank_destination?.name ?? "Pilih Bank Destination"} */}
                          {account_bank?.bankname}-{account_bank?.account}-{account_bank?.name}
                        </option>
                      );
                    })
                  ) : (
                    <option className={style.placeholder} value="">
                      Pilih Rekening Bank
                    </option>
                  )}
                </select>
                <select
                  name='status'
                  value={selectedStatus}
                  className={`form-control form-group ${style.placeholder}`}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                  }}
                >
                  <option value=''>Pilih Status</option>
                  <option value='PENDING'>Pending</option>
                  <option value='APPROVE'>Approve</option>
                  <option value='REJECT'>Reject</option>
                </select>
                <input
                  type="date"
                  name='daritanggal'
                  value={dariTanggal}
                  placeholder='Tanggal Dari...'
                  // className={`${style.searchInput}`}
                  onChange={(e) => {
                    setDariTanggal(e.target.value);
                    // setactiveSearch("search");
                  }}
                />
                <input
                  type="date"
                  name='sampaitanggal'
                  value={sampaiTanggal}
                  placeholder='Tanggal Sampai...'
                  // className={`${style.searchInput}`}
                  onChange={(e) => {
                    setSampaiTanggal(e.target.value);
                    // setactiveSearch("search");
                  }}
                />
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
                    setSelectedAccBank("");
                    setSelectedStatus("");
                    setDariTanggal("");
                    setSampaiTanggal("");
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
