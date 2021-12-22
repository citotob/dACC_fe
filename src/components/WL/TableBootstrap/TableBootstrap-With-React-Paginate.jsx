import React, { useState, useEffect } from "react";
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

// IMPORT DUMMY DATA
// import { datatabel } from "./datatable";

//import API
import { url } from "../../../services/Config";
import API from "../../../services";

// IMPORT LIBRARY
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

function TableBootstrap() {
  // states
  const [refresh, setrefresh] = useState(false);
  const [alertVerifyStatus, setalertVerifyStatus] = useState(
    style.alertVerifyOff
  );
  const [alertRejectStatus, setalertRejectStatus] = useState(
    style.alertRejectOff
  );
  const [selectedTableData, setselectedTableData] = useState(null); // untuk simpan data ID untuk aksi verify atau decline
  const [alasanTolak, setalasanTolak] = useState("");
  const [tableData, settableData] = useState([]);
  const [loadingAktif, setloadingAktif] = useState(false); // untuk skeleton table Aktif

  //pagination states and consts
  const [pageNumber, setpageNumber] = useState(0); // which page we are in

  const dataPerPage = 10; // how many to show per page
  const pagesVisited = pageNumber * dataPerPage; // how many users we have seen so far
  const pageCount = Math.ceil(tableData?.length ?? 1 / dataPerPage);

  const displayData = tableData
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .map((data, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{data?.name}</td>
          <td>{data?.code}</td>
          <td>{data?.currency}</td>
        </tr>
      );
    });

  // modal states
  const [modalVerifyOpen, setmodalVerifyOpen] = useState(false);

  // fetch api
  const getDataBankTable = () => {
    setloadingAktif(true);
    API.getDataBankTable("status=requested")
      .then((res) => {
        if (res.status === 200) {
          console.log("API Table Requested : ", res.data.values);
          settableData(res.data.values);
        } else {
          settableData(null);
        }
        setloadingAktif(false);
      })
      .catch((err) => {
        settableData(null);
        setloadingAktif(false);
        console.log(err);
      });
  };


  // useeffect
  useEffect(() => {
    getDataBankTable();
  }, []);

  useEffect(() => {
    getDataBankTable();
  }, [refresh]);

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
  // Tabs functions (verifikasi, aktif, ditolak)

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

  // Action Button Functions
  const handleVerifyAction = (data) => {
    let params = {
      id: data,
    };
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

  // Table components
  const tableAktif = () => {
    return (
      <div className='table-responsive-lg'>
        <table className='table'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Nama</th>
              <th>Code</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data?.id}</td>
                  <td>{data?.name}</td>
                  <td>{data?.code}</td>
                  <td>{data?.currency}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
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
                    }}
                  >
                    <span className='d-none d-sm-block'>Bank Aktif</span>
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
                    }}
                  >
                    <span className='d-none d-sm-block'>Bank Ditolak</span>
                  </NavLink>
                </NavItem>
                <div className={`${style.tableSearchWrapper} ml-auto`}>
                  <div className={`${style.tableSearchBar}`}>
                    <i className='bi bi-search'></i>
                    <input
                      type='text'
                      name='search'
                      placeholder='Search...'
                      className={`${style.searchInput}`}
                    />
                  </div>
                  <div className={`${style.tableSearchButtonWrapper}`}>
                    <button className={`${style.tableSearchButton}`}>
                      import
                    </button>
                    <button className={`${style.tableSearchButton}`}>
                      export
                    </button>
                  </div>
                </div>
              </Nav>

              <TabContent activeTab={customActiveTab}>
                <TabPane tabId='2' className='p-3'>
                  <Row>
                    <Col sm='12'>
                      {loadingAktif ? (
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
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={1}
            nextLinkClassName={`${style.nextLink}`}
            previousClassName={`${style.prevlink}`}
            containerClassName={`${style.pagination}`}
            activeClassName={`${style.activePage}`}
            pageClassName={`${style.paginationStyle}`}
            pageLinkClassName={`${style.pageLink}`}
            onPageActive={(e) => e.selected === pageNumber}
            onPageChange={(e) => {
              setpageNumber(e.selected);
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default TableBootstrap;
